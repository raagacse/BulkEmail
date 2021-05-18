import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { UserInfo } from '../auth-model/user-info';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public progressbar:boolean = false;
  public focusUName:boolean = false;
  public focusPass:boolean = false;

  public userName:string="";
  public password:string="";
  public token:string;
  public userInfo:UserInfo;  
  public errMsg:string="";

  constructor(private http:AppService, private route:Router, private dataSharing:DataSharingService) { }

  ngOnInit() {
  }

  Login()
  { 
    this.progressbar = true;
    if(this.userName !="" && this.password !="")
    {
      this.userInfo = new UserInfo("","","","","","","");
      this.userInfo.userName = this.userName;
      this.userInfo.password = this.password;
  
      this.http.Authentication(this.userInfo).subscribe(
        (x:UserInfo) => {              
          sessionStorage.setItem('userInfo', JSON.stringify({userId: x.userName,token: x.token,firstName: x.firstName,lastName:x.lastName}));
          let val =  JSON.parse(sessionStorage.getItem('userInfo'));        
          this.token = val.token;        
          this.userInfo = new UserInfo("","","","","","","");
          this.userInfo.userName = x.userName;
          this.userInfo.firstName = x.firstName;
          this.userInfo.lastName = x.lastName;
          this.userInfo.email = x.email;
          this.userInfo.dob = x.dob;
  
          this.dataSharing.loggedIn.next(true);
          this.route.navigate(['/fu']);
        },
        (err)=>{
          console.log('err',err);
          this.errMsg = "Incorrect username/password!!"
          this.progressbar = false;     
        },
        ()=>{
          this.progressbar = false;     
          console.log('Successfully Logged In..');        
        });
    }    
    else
    {
      this.progressbar = false;
      this.errMsg = "Please enter the username and password!!"
    }
  }
  UserNameStyleHandling()
  { 
    if(this.userName != ""){      
      this.focusUName = true;
    }
    else {      
      this.focusUName = false;
    }    
  }
  PwdStyleHandling()
  { 
    if(this.password != ""){    
      this.focusPass = true;
    }
    else {      
      this.focusPass = false;
    }    
  }
}
