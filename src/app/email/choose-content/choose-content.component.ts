import { Component, OnInit } from '@angular/core';
import { ClsContent, ClsContentShort } from '../model/email-dtl';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { SanitizeHtmlPipe } from 'src/app/services/sanitize-html.pipe';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-choose-content',
  templateUrl: './choose-content.component.html',
  styleUrls: ['./choose-content.component.css']
})
export class ChooseContentComponent implements OnInit {

  public srcContentLst:ClsContent[] = [];
  public ContentLst:ClsContentShort[] = [];
  public viewMoreContent:ClsContentShort;
  public viewMore:boolean = false;

  public selectedContent : ClsContent;
  public contentSubscription: Subscription;

  public checkContentId:number = 9999;
  public fupload:boolean = false;

  constructor(private appService: AppService, private dataSharing: DataSharingService, 
    private router:Router) { }

  ngOnInit() {  
    this.selectedContent = new ClsContent(null,"","","");
    this.viewMoreContent = new ClsContentShort(0,"","","","");
    this.GetEmailContent();
    this.GetParams();
  }

  ngOnDestroy() {
    if(this.contentSubscription != null)
    {
      this.contentSubscription.unsubscribe();
    }    
  }

  GetParams()
  {
    this.dataSharing.fupload.subscribe(
      (x:boolean) => {
        this.fupload = x;          
        console.log('fupload',this.fupload);
        
      });
  }

  //#region --Get Email Content
  GetEmailContent()
  {
    this.dataSharing.activeMenu.next("chc");
    let paramContentId:number = 0;
    this.contentSubscription = this.appService.EmailContent(paramContentId).subscribe(
      x => {
        this.srcContentLst = x;
        this.AssignEmailContent(this.srcContentLst);
    });

    this.dataSharing.activeMenu.subscribe(      
      (x)=>{
        console.log('activemenu',x);      
      });
  }

  AssignEmailContent(content:ClsContent[])
  { 
    this.ContentLst = [];   
    let tmpContent:ClsContentShort;
    content.forEach(x => {
      tmpContent = new ClsContentShort(
        x.contentId,
        x.emailContent, 
        x.emailFrom, 
        x.emailSubject,                
        x.emailContent.substr(0,500)+"..."
        );

        this.ContentLst.push(tmpContent);        
    });
    
  }

  //#endregion

  //#region --Selected Content
  SelectContent(content:ClsContentShort)
  {    
    this.selectedContent = new ClsContent(
      content.contentId,
      content.emailContent,
      content.emailFrom,
      content.emailSubject
      );      
      console.log(this.selectedContent);    

      this.dataSharing.shareEmailContent.next(this.selectedContent);
  }
  //#endregion

  //#region --Remove Content
  Delete(contentId:number)  
  {
    console.log('ContentId', contentId);    
    this.appService.DeleteEmailContent(contentId).subscribe(
      x=>{
        console.log('Delete Status: ',x);
        this.GetEmailContent();
    });
  }
  //#endregion

  //#region --Edit Content
  Edit(emailContent:ClsContent)  
  {
      this.dataSharing.shareEmailContent.next(emailContent);
      this.router.navigate(['/cc'], {queryParams : { e:'p' }});
  }
  //#endregion
  
  //#region --Navigate to edit page
  EmailContent()
  {
    this.dataSharing.activeMenu.next("cc");
    this.router.navigate(['/cc'], {queryParams : { e:'n' }});
  } 
  //#endregion  
  ShowOptions(contentId:number)
  { 
    console.log('contentId:',contentId);   
    if(contentId === this.checkContentId)
    {
      this.checkContentId = 0;
    }
    else
    {
      this.checkContentId = contentId;
    }
    
    console.log('checkContentId:',this.checkContentId);
  }    

  ShowFullContent(content:ClsContentShort)
  {
    this.viewMoreContent = new ClsContentShort(0,"","","","");
    this.viewMoreContent = content;
    let fullContent = this.viewMoreContent.emailContent;
    document.getElementById("eContent").innerHTML = fullContent;
    this.viewMore = true;
  }
}