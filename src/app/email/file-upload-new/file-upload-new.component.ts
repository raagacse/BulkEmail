import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpEventType, HttpEvent } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ClsEmail, ClsContent, ClsContentShort, ClsSendEmailContent } from '../model/email-dtl';
import { AppService } from 'src/app/services/app.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Router, Routes } from '@angular/router';


@Component({
  selector: 'app-file-upload-new',
  templateUrl: './file-upload-new.component.html',
  styleUrls: ['./file-upload-new.component.css']
})
export class FileUploadNewComponent implements OnInit, OnDestroy {

  public fileSelected:boolean = false;  
  public enableProgressBar:boolean = false;
  public uploadCompleted:boolean = false;
  public showEmailPopup:boolean = false;
  public fileName:string;
  public progressPer: number;
  public progressbar:boolean=false;
  public message: string;
  public emailLst:ClsEmail[] = [];
  
  public srcContentLst:ClsContent[] = [];
  public ContentLst:ClsContentShort[] = [];

  public fileUploadSubscription: Subscription;
  public contentSubscription: Subscription;

  public selectedContent : ClsContent;
  public selectedEmailLst: ClsEmail[];

  public emailStatus:string;

  public color = 'primary';
  public mode = 'determinate';  

  constructor(private appService: AppService, private http: HttpClient, private dataSharing:DataSharingService,
    private router:Router) { }

  ngOnInit() {
    this.SharedData();
    this.GetEmailContent();
  }

  ngOnDestroy() {
    if(this.fileUploadSubscription != null)
    {
      this.fileUploadSubscription.unsubscribe();
    }
    if(this.contentSubscription != null)
    {
      this.contentSubscription.unsubscribe();
    }
    
  }

  SharedData()
  {
    this.contentSubscription = this.dataSharing.shareEmailContent.subscribe(
      x => {
        this.selectedContent = x;
      });
  }

  //#region --File Upload
  onFileChange(event:any)
  { 
    if(event.target.files.length>0)
    {
      let files = event.target.files;
      const fileObj = files[0];
      this.fileName = fileObj.name;
      this.fileSelected = true;
    }
  }

  FileUpload(file: any) {
    this.enableProgressBar = true;
    if (file.length > 0) {
      console.log('File', file[0]);
      if (file[0].type == "text/plain") {
        const formData = new FormData()
        formData.append('file', file[0], file[0].name);

        this.fileUploadSubscription = this.appService.FileUpload(formData)
          .subscribe(
            (event:HttpEvent<any>) => {            

            if(event.type == HttpEventType.UploadProgress)
            {              
              this.progressPer = Math.round(100 * event.loaded / event.total);
            }
            else if(event.type == HttpEventType.Response)
            {              
              this.emailLst = <ClsEmail[]>event.body;

              this.dataSharing.emailList.next(this.emailLst);

              this.enableProgressBar = false;
              this.uploadCompleted = true;
            }                    
          })

        /*
        this.fileUploadSubscription = this.appService.FileUpload(formData)
          .subscribe(events => {
            if (events.type == HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * events.loaded / events.total);
            }
            else if (events.type == HttpEventType.Response) {
              this.message = events.body.toString();
            }
            console.log(events);
          })
        */  
        /*
        const uploadReq = new HttpRequest('POST','http://localhost:5000/api/email/fu',
        formData, { reportProgress:true });
        
        this.http.request(uploadReq).subscribe(
          event => {
            if(event.type == HttpEventType.UploadProgress)
            {
              this.progress = Math.round(100 * event.loaded / event.total);
            }
            else if(event.type == HttpEventType.Response)
            {
              this.message = event.body.toString();
            }
          }
        );
        */
      }
    }
  }
  //#endregion

  //#region --Get Email Content
  GetEmailContent()
  {
    let paramContentId:number = 0;
    this.appService.EmailContent(paramContentId).subscribe(
      x => {
        this.srcContentLst = x;
        this.AssignEmailContent(this.srcContentLst);
    });
  }

  AssignEmailContent(content:ClsContent[])
  { 
    this.dataSharing.fupload.next(true);
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

    /*
  //#region --Send Email
  Next()
  {
    
  
    this.progressbar = true;
    this.emailStatus = "";
    this.selectedEmailLst = [];
    this.selectedEmailLst = this.emailLst
    console.log('Email',this.selectedEmailLst);
    console.log('Content',this.selectedContent);
    
    let sendEmailContent:ClsSendEmailContent = new ClsSendEmailContent(null,null);    
    sendEmailContent.emailGroupId = this.selectedEmailLst[0].emailGroupId;
    sendEmailContent.contentId = this.selectedContent.contentId;    

    this.appService.SendEmail(sendEmailContent).subscribe(
      (x) => {
        console.log(x);        
      },
      (error)=>{
        console.log('Error Occured');        
        this.emailStatus = error;
        this.progressbar = false;
      },
      () => {
        console.log('Successfully Completed...');        
        this.emailStatus = "Email sent out successfully"
        this.progressbar = false;
      });

      

  }
  //#endregion
  */

  //#region --Selected Content
  SelectedConent(content:ClsContentShort)
  {    
    this.selectedContent = new ClsContent(
      content.contentId,      
      content.emailContent,
      content.emailFrom,
      content.emailSubject
      );            
  }
  //#endregion

  //#region --Remove Content
  Delete(contentId:number)  
  {
    console.log('ContentId', contentId);    
    this.appService.DeleteEmailContent(contentId).subscribe(
      x=>{
        console.log('Delete Status: ',x);
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
    this.router.navigate(['/cc'], {queryParams : { e:'n' }});
  } 
  //#endregion


  ChangeFile()
  {
    this.fileSelected = false;
    this.uploadCompleted = false;
    this.progressPer = 0;
  }
  RemoveFile()
  {
    this.fileSelected = false;
    this.uploadCompleted = false;
    this.progressPer = 0;
  }
  EmailPopup()
  {
    this.showEmailPopup = true;
  }

}
