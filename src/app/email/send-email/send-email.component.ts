import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { ClsEmail, ClsEmailStatus, ClsContent, ClsSendEmailContent } from '../model/email-dtl';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  public progressbar:boolean = false;  
  public emailStatus: string;
  public showContent:boolean = true;
  public showSchedule:boolean = true;
  public scheduleStatus:boolean = false;

  public emailLst:ClsEmail[] = [];
  public selectedContent : ClsContent;
  public selectedEmailLst: ClsEmail[];
  public emailStatusLst: ClsEmailStatus[] = [];

  constructor(private appService:AppService, private dataSharing:DataSharingService) { }

  ngOnInit() {
    this.emailStatus = "";
    console.log('emailStatusLst',this.emailStatusLst);
    this.showContent = true;
    this.emailStatusLst = [];        
    this.GetData();    
    this.ShowFullContent();        
  }

  GetData()
  {
      this.dataSharing.emailList.subscribe(
        (x:ClsEmail[])=> {
          this.emailLst = x;
          console.log('emailLst',this.emailLst);          
        }
      )

      this.dataSharing.shareEmailContent.subscribe(
        (x:ClsContent)=> {
          this.selectedContent = x;
        }
      )
  }
 

  //#region --Send Email
  SendEmail()
  {    
    console.log('Send E-mail');    
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
      (x:ClsEmailStatus[]) => {
        console.log(x);          
        this.AssignEmailStatus(x);
      },
      (error)=>{
        console.log('Error Occured');        
        this.emailStatus = error;
        this.progressbar = false;
        this.showContent = false;
      },
      () => {
        console.log('Successfully Completed...');        
        this.emailStatus = "Email sent out successfully"
        this.progressbar = false;
        this.showContent = false;
      });
  }
  //#endregion

  AssignEmailStatus(emStatusLst:ClsEmailStatus[])
  {
    this.emailStatusLst = emStatusLst.sort(
      (x,y) => {
        return x.emailStatus > y.emailStatus ? 1 : -1;        
    });
  }

  ShowFullContent()
  { 
    document.getElementById("eContent").innerHTML = this.selectedContent.emailContent;    
  }

  Schedule()
  {
    console.log('Schedule E-mail');    
    this.progressbar = true;
    this.scheduleStatus = false;
    this.emailStatus = "";    
    this.selectedEmailLst = [];
    this.selectedEmailLst = this.emailLst
    console.log('Email',this.selectedEmailLst);
    console.log('Content',this.selectedContent);
    
    let sendEmailContent:ClsSendEmailContent = new ClsSendEmailContent(null,null);    
    sendEmailContent.emailGroupId = this.selectedEmailLst[0].emailGroupId;
    sendEmailContent.contentId = this.selectedContent.contentId;    

    this.appService.ScheduleEmailContent(sendEmailContent).subscribe(
      (x:boolean) => {
        console.log(x);                          
        this.emailStatus = "Emails were scheduled successfully"
      },
      (error)=>{
        console.log('Error Occured');        
        this.emailStatus = error;
        this.progressbar = false;
        this.showContent = false;
      },
      () => {
        console.log('Successfully Completed...');                
        this.progressbar = false;
        this.showContent = false;
        this.scheduleStatus = true;
      });
  }

}
