import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public loggedIn: boolean = false;
  public userName: string = "";

  public showFU: boolean = true;
  public showCC: boolean = false;
  public showAC: boolean = false;
  public showOS: boolean = false;
  public showProfileMenu: boolean = false;

  constructor(private route: Router, private dataShare: DataSharingService) { }

  ngOnInit() {
    this.GetParam();
    this.route.navigate(['/si']);
  }

  GetParam() {

    this.dataShare.loggedIn.subscribe(
      (x: boolean) => {
        this.loggedIn = x
        if (x == true) {
          let val = JSON.parse(sessionStorage.getItem('userInfo'));
          this.userName = val.firstName + ' ' + val.lastName;
        }
      });

    this.dataShare.activeMenu.subscribe(
      (x) => {

        console.log('selectedMenu', x);

        if (x.toLowerCase() == "cc") {
          console.log('selectedMenu', x);

          this.showFU = false;
          this.showCC = true;
          this.showAC = false;
        }
        else if (x.toLowerCase() == "chc") {
          console.log('selectedMenu', x);
          this.showFU = false;
          this.showCC = false;
          this.showAC = true;
        }
      });
  }

  FileUploadLink() {
    this.showFU = true;
    this.showCC = false;
    this.showAC = false;
    this.showOS = false;
    this.showProfileMenu = false;
    this.dataShare.activeMenu.next("fu");
    this.route.navigate(['/fu']);

  }

  CreateContentLink() {
    this.showFU = false;
    this.showCC = true;
    this.showAC = false;
    this.showOS = false;
    this.showProfileMenu = false;
    this.dataShare.activeMenu.next("cc");
    this.route.navigate(['/cc', { queryParams: { e: 'n' } }]);
  }
  AvailableContentLink() {
    this.showFU = false;
    this.showCC = false;
    this.showAC = true;
    this.showOS = false;
    this.showProfileMenu = false;
    this.dataShare.fupload.next(false);
    this.dataShare.activeMenu.next("chc");
    this.route.navigate(['/chc']);
  }
  TransactReport() {
    this.showFU = false;
    this.showCC = false;
    this.showAC = false;
    this.showOS = true;
    this.showProfileMenu = false;
    this.dataShare.activeMenu.next("os");
    this.route.navigate(['/uh']);
  }
  ScheduledRpt() {
    this.showFU = false;
    this.showCC = false;
    this.showAC = false;
    this.showOS = true;
    this.showProfileMenu = false;
    this.dataShare.activeMenu.next("os");
    this.route.navigate(['/srpt']);
  }
  Rpt() {
    this.showOS = this.showOS ? false : true;
  }
  ProfileMenu() {
    this.showProfileMenu = this.showProfileMenu ? false : true;
  }
  Signout() {
    this.showProfileMenu = false;
    this.dataShare.loggedIn.next(false);
    sessionStorage.removeItem("userInfo");
    console.log('userInfo', sessionStorage.getItem("userInfo"));
    this.route.navigate(['/si']);
  }


}
