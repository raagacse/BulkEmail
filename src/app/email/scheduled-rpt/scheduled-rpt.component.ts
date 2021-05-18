import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClsScheduledRpt, ClsEmailStatus, ClsContent, ClsUploadId, ClsScheduledEmailStatus } from '../model/email-dtl';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-scheduled-rpt',
  templateUrl: './scheduled-rpt.component.html',
  styleUrls: ['./scheduled-rpt.component.css']
})
export class ScheduledRptComponent implements OnInit, OnDestroy {

  public progressbar:boolean = false;
  public srcuploadList:ClsScheduledRpt[] = [];  
  public emailStatusLst:ClsScheduledEmailStatus[] = [];
  public emailContent:ClsContent;
  public viewEmailStatus:boolean = false;
  public viewEmailContent:boolean = false;  

  public UploadHistorySub:Subscription;
  public getEmailStatusSub:Subscription;
  public contentSubscription:Subscription;   
  public uploadDelete:Subscription;   

  constructor(private appService:AppService, private dataSharing:DataSharingService) { }

  ngOnInit() {
    this.emailContent = new ClsContent(0,"","","");    
    this.ScheduledRpt();    
  }

  ngOnDestroy()  
  {
    if(this.UploadHistorySub != null)
    {
      this.UploadHistorySub.unsubscribe();
    }
    if(this.getEmailStatusSub != null)
    {
      this.getEmailStatusSub.unsubscribe();
    }
    if(this.contentSubscription != null)
    {
      this.contentSubscription.unsubscribe();
    }
    if(this.contentSubscription != null)
    {
      this.uploadDelete.unsubscribe();
    }
    
  }


  ScheduledRpt()
  {
    this.progressbar = true;
    this.UploadHistorySub = this.appService.ScheduledRpt().subscribe(
    (x:ClsScheduledRpt[])=>{
      console.log('rpt',x);
      
      this.srcuploadList = x;      
    },
    (error)=>{
      this.progressbar = false;
      console.log('ErrorInfo:',error);                 
    },
    ()=>{
      this.progressbar = false;
      console.log('Upload History Completed Successfully');         
    });
  }

  EmailList(uploadId:number)
  {
    this.progressbar = true;
    let uploaddtl:ClsUploadId = new ClsUploadId(uploadId,"");      
    this.getEmailStatusSub = this.appService.ScheduledEmailStatus(uploaddtl).subscribe(
      (x:ClsScheduledEmailStatus[])=>{
        console.log('status',x);      
        this.emailStatusLst = x;  
        this.viewEmailStatus = true;
      },
      (error)=>{
        this.progressbar = false;     
        console.log('status',error);           
      },
      ()=>{
        this.progressbar = false;     
        console.log('Completed');        
      });
    
  }

  EmailContent(contentId:number)
  {
    console.log(contentId); 
    this.viewEmailContent=true;
    this.emailContent = new ClsContent(0,"","","");
    this.GetEmailContent(contentId);
  }


  GetEmailContent(contentId:number)
  {   
    let paramContentId:number = contentId;
    this.contentSubscription = this.appService.EmailContent(paramContentId).subscribe(
      (x:ClsContent[]) => {      
      console.log('Content',x);  
      this.emailContent = x[0];      
      let fullContent = this.emailContent.emailContent;
      document.getElementById("eContent").innerHTML = fullContent;
    });
  }

  DownloadExcel(uploadId:number)
  {
    this.progressbar = true;
    let uploaddtl:ClsUploadId = new ClsUploadId(uploadId,"");               
    this.appService.Download_Scheduled_EmailStatus_Excel(uploaddtl).subscribe(
      (response:any) => {         
        
        let contentType = response.headers.get('Content-Type');
        let fileName = response.headers.get('x-filename');

        if(fileName == null || fileName == "")
        {                
          this.progressbar = false;
        }   
        else
        {
          let binaryData = [];  
          binaryData.push(response.body);
          let downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: contentType }));
  
          downloadLink.setAttribute('download', fileName);
          document.body.appendChild(downloadLink);
          downloadLink.click();
        }
    },
    (error:any)=>{ 
      console.log('Error: ',error); 
      this.progressbar = false;
      },
    ()=>{
      console.log('Complete'); 
      this.progressbar = false;
    });
  }
}
