import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClsUploadHistory, ClsUploadId, ClsEmailStatus, ClsContent, ClsUploadHistorySel } from '../model/email-dtl';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { AppService } from 'src/app/services/app.service';
import { ThrowStmt } from '@angular/compiler';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-upload-history',
  templateUrl: './upload-history.component.html',
  styleUrls: ['./upload-history.component.css']
})
export class UploadHistoryComponent implements OnInit, OnDestroy {

  public progressbar: boolean = false;
  public srcuploadList: ClsUploadHistory[] = [];
  public uploadList: ClsUploadHistorySel[] = [];
  public emailStatusLst: ClsEmailStatus[] = [];
  public emailContent: ClsContent;
  public viewEmailStatus: boolean = false;
  public viewEmailContent: boolean = false;
  public selectedUploadId: ClsUploadHistorySel[] = [];

  public UploadHistorySub: Subscription;
  public getEmailStatusSub: Subscription;
  public contentSubscription: Subscription;
  public uploadDelete: Subscription;

  constructor(private appService: AppService, private dataSharing: DataSharingService) { }

  ngOnInit() {
    this.emailContent = new ClsContent(0, "", "", "");
    this.selectedUploadId = [];
    this.GetUploadedList();
  }

  ngOnDestroy() {
    if (this.UploadHistorySub != null) {
      this.UploadHistorySub.unsubscribe();
    }
    if (this.getEmailStatusSub != null) {
      this.getEmailStatusSub.unsubscribe();
    }
    if (this.contentSubscription != null) {
      this.contentSubscription.unsubscribe();
    }
    if (this.contentSubscription != null) {
      this.uploadDelete.unsubscribe();
    }

  }


  GetUploadedList() {
    this.progressbar = true;
    this.UploadHistorySub = this.appService.UploadHistory().subscribe(
      (x: ClsUploadHistory[]) => {
        this.srcuploadList = x;
        console.log('srcuploadList', this.srcuploadList);

        this.AssignValue(this.srcuploadList);
      },
      (error) => {
        this.progressbar = false;
        console.log('ErrorInfo:', error);
      },
      () => {
        this.progressbar = false;
        console.log('Upload History Completed Successfully');
      });
  }

  AssignValue(emailList: ClsUploadHistory[]) {
    this.uploadList = [];
    let uploadInfo: ClsUploadHistorySel;
    emailList.forEach(x => {
      uploadInfo = new ClsUploadHistorySel(x.uploadId, x.totalEmailCount, x.successCount, x.failureCount, x.unsubscribed, x.contentId, x.uploadTime, x.userName, false);
      this.uploadList.push(uploadInfo);
    });

    console.log('loaded');
  }

  UploadSelection(uploadDtl: ClsUploadHistorySel) {
    let uploadfilter: ClsUploadHistorySel[] = this.selectedUploadId.filter((x) => x.uploadId === uploadDtl.uploadId);
    console.log('uploadfilter', uploadfilter);

    if (uploadfilter.length > 0) {
      const index = this.selectedUploadId.findIndex(x => x.uploadId === uploadDtl.uploadId);
      this.selectedUploadId.splice(index, 1);
    }
    else {
      this.selectedUploadId.push(uploadDtl);
    }
    console.log('selectedUploadId', this.selectedUploadId);
  }

  EmailList(uploadId: number) {
    this.progressbar = true;
    let uploaddtl: ClsUploadId = new ClsUploadId(uploadId, "");
    this.getEmailStatusSub = this.appService.GetEmailSendStatus(uploaddtl).subscribe(
      (x: ClsEmailStatus[]) => {
        console.log('status', x);
        this.emailStatusLst = x;
        this.viewEmailStatus = true;
      },
      (error) => {
        this.progressbar = false;
        console.log('status', error);
      },
      () => {
        this.progressbar = false;
        console.log('Completed');
      });

  }

  EmailContent(contentId: number) {
    console.log(contentId);
    this.viewEmailContent = true;
    this.emailContent = new ClsContent(0, "", "", "");
    this.GetEmailContent(contentId);
  }


  GetEmailContent(contentId: number) {
    let paramContentId: number = contentId;
    this.contentSubscription = this.appService.EmailContent(paramContentId).subscribe(
      (x: ClsContent[]) => {
        console.log('Content', x);
        this.emailContent = x[0];
        let fullContent = this.emailContent.emailContent;
        document.getElementById("eContent").innerHTML = fullContent;
      });
  }

  DownloadExcel(uploadId: number) {
    this.progressbar = true;
    let uploaddtl: ClsUploadId = new ClsUploadId(uploadId, "");
    this.appService.DownloadEmailStatus_Excel(uploaddtl).subscribe(
      (response: any) => {

        let contentType = response.headers.get('Content-Type');
        let fileName = response.headers.get('x-filename');

        if (fileName == null || fileName == "") {
          this.progressbar = false;
        }
        else {
          let binaryData = [];
          binaryData.push(response.body);
          let downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: contentType }));

          downloadLink.setAttribute('download', fileName);
          document.body.appendChild(downloadLink);
          downloadLink.click();
        }
      },
      (error: any) => {
        console.log('Error: ', error);
        this.progressbar = false;
      },
      () => {
        console.log('Complete');
        this.progressbar = false;
      });
  }

  OnDelete() {
    this.progressbar = true;
    let uploadInfo: ClsUploadId;
    let uploadLst: ClsUploadId[] = [];

    this.selectedUploadId.forEach(x => {
      uploadInfo = new ClsUploadId(x.uploadId, "");
      uploadLst.push(uploadInfo);
    });

    this.uploadDelete = this.appService.DeleteUpload(uploadLst).subscribe(
      (x: boolean) => {
        console.log(x);
        this.GetUploadedList();
      },
      (error) => {
        this.progressbar = false;
        console.log('Error', error);
      },
      () => {
        this.progressbar = false;
      }

    );

  }
}
