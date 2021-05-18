import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { ClsSaveContent, ClsContent, ClsContentShort, ClsEmailFrom } from 'src/app/email/model/email-dtl';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.css']
})
export class CreateContentComponent implements OnInit {

  public progressbar: boolean = false;
  public isNewContent: boolean = true;
  public activeMenu: string;
  public title: string = "Create Content";

  public contentId: number;
  public emailSubject: string;
  public emailFrom: string = "";
  public emailContent: string;

  public content: ClsSaveContent;

  public srcContentLst: ClsContent[] = [];
  public ContentLst: ClsContentShort[] = [];

  public focusSubject: boolean = false;

  public link: string = "";
  public fontSize: string = "0";
  public fontName: string = "0";
  public srcfontName: string[] = [];

  public emailFromLst: ClsEmailFrom[] = [];

  public validEContent: boolean = true;

  constructor(private appService: AppService, private dataSharing: DataSharingService,
    private route: Router, private activatedRoute: ActivatedRoute) { }

  public mailConent: ClsContent;

  ngOnInit() {
    this.mailConent = new ClsContent(0, "", "", "");
    this.emailFrom = "";
    this.GetEmailFromLst();
    this.LoadFontName();
    this.GetSharedData();
  }

  GetSharedData() {
    this.dataSharing.shareEmailContent.subscribe(
      (x: ClsContent) => {
        this.mailConent = x;
        this.AssignData(this.mailConent);
      });

    this.activatedRoute.queryParams.subscribe(
      (x: Params) => {
        console.log('x', x);
        if (x["e"] === "p") {
          this.isNewContent = false;
          console.log('isNewContent', this.isNewContent);
          this.title = "Edit Email Content"
        }
        else {
          this.isNewContent = true;
          console.log('isNewContent', this.isNewContent);
          this.emailSubject = "";
          this.emailFrom = "";
          this.emailContent = "";
          this.focusSubject = false;
          document.getElementById("eContent").innerHTML = "";
          this.title = "Create Email Content"

        }
      });

    this.dataSharing.activeMenu.subscribe(
      (x: string) => {
        this.activeMenu = x;
      }
    );

  }

  AssignData(content: ClsContent) {
    this.contentId = content.contentId;
    this.emailSubject = content.emailSubject;
    this.emailFrom = content.emailFrom;
    this.emailContent = content.emailContent;
    console.log('div', document.getElementById("eContent"));

    if (document.getElementById("eContent") != null) {
      document.getElementById("eContent").innerHTML = this.emailContent;
    }

    this.focusSubject = true;
  }
  //#region --Save Email Content
  SaveContent(divContent: any) {
    this.progressbar = true;
    this.dataSharing.fupload.next(false);

    if (this.emailSubject != "" && this.emailFrom != "" && divContent.innerHTML != "") {
      this.validEContent = true;

      if (this.isNewContent === true) {
        this.NewContent(divContent);
      }
      else if (this.isNewContent === false) {
        this.EditContent(divContent);
      }
    }
    else {
      this.validEContent = false;
      this.progressbar = false;
    }
  }

  GetEmailFromLst() {

    this.appService.GetEmailFromLst().subscribe(
      x => {
        this.emailFromLst = x;
        console.log('srcEmailFromLst', this.emailFromLst);

      });
  }

  NewContent(divContent: any) {
    this.emailContent = divContent.innerHTML;
    this.emailContent = this.emailContent.replace("<div>", "").replace("</div>", "");
    console.log('DivContent', this.emailContent);
    this.content = new ClsSaveContent("", "", "");
    this.content.emailSubject = this.emailSubject;
    this.content.emailFrom = this.emailFrom;
    this.content.emailContent = this.emailContent;
    console.log('Content', this.content);

    this.appService.SaveEmailContent(this.content).subscribe(
      x => {
        console.log('Result', x);
        this.route.navigate(['/chc']);
      });
  }
  EditContent(divContent: any) {
    this.emailContent = divContent.innerHTML;
    this.emailContent = this.emailContent.replace("<div>", "").replace("</div>", "");
    console.log('DivContent', this.emailContent);

    this.mailConent.emailSubject = this.emailSubject;
    this.mailConent.emailFrom = this.emailFrom;
    this.mailConent.emailContent = this.emailContent;
    console.log('content', this.mailConent);

    this.appService.EditEmailContent(this.mailConent).subscribe(
      x => {

        console.log('Result', x);
        this.route.navigate(['/chc']);

      });
  }
  //#endregion

  //#region --Email Content    
  GetEmailContent() {
    let paramContentId: number = 0;
    this.appService.EmailContent(paramContentId).subscribe(
      x => {
        this.srcContentLst = x;
        this.AssignEmailContent(this.srcContentLst);
        console.log('srcContentLst:', this.srcContentLst);

      });
  }

  AssignEmailContent(content: ClsContent[]) {
    this.ContentLst = [];
    let tmpContent: ClsContentShort;
    content.forEach(x => {
      tmpContent = new ClsContentShort(
        x.contentId,
        x.emailSubject,
        x.emailFrom,
        x.emailContent,
        x.emailContent.substr(0, 200) + "..."
      );

      this.ContentLst.push(tmpContent);
    });

  }

  //#endregion

  //#region --Subject Style

  SubjectStyleHandling() {
    if (this.emailSubject != "") {
      this.focusSubject = true;
    }
    else {
      this.focusSubject = false;
    }

  }

  //#endregion
  //#region --Content Style
  LoadFontName() {
    this.srcfontName.push("Times New Roman");
    this.srcfontName.push("Arial");
    this.srcfontName.push("Calibri");
    this.srcfontName.push("Courier New");
    this.srcfontName.push("Courier");
    this.srcfontName.push("Helvetica");
    this.srcfontName.push("Times");
    this.srcfontName.push("Verdana");
    this.srcfontName.push("Georgia");
    this.srcfontName.push("Palatino");
    this.srcfontName.push("Garamond");
    this.srcfontName.push("Bookman");
    this.srcfontName.push("Comic Sans MS");
    this.srcfontName.push("Trebuchet MS");
    this.srcfontName.push("Arial Black");
    this.srcfontName.push("Impact");
    console.log('srcfontName', this.srcfontName);

  }

  Bold() {
    document.execCommand('bold', false, '');
  }
  Italic() {
    document.execCommand('italic', false, '');
  }
  Underline() {
    document.execCommand('underline', false, 'blue');
  }
  CreateLink() {
    this.link = window.prompt("Enter the link");
    console.log('link', this.link);

    if (this.link != "") {
      document.execCommand('createLink', true, this.link);
    }
    else {
      alert("Enter the link!!");
    }

  }
  FontName() {
    console.log(this.fontName);
    document.execCommand('fontname', false, this.fontName);
  }
  FontSize() {
    console.log(this.fontSize);
    document.execCommand('fontsize', false, this.fontSize);
  }
  BackToContentList() {
    this.route.navigate(['/chc']);
  }
  //#endregion

}
