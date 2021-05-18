import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public showFU:boolean = true;
  public showCC:boolean = false;
  public showAC:boolean = false;

  constructor(private route:Router, private dataShare:DataSharingService) { }

  ngOnInit() {
    this.route.navigate(['/fu']);
    this.GetParams();
  }

  GetParams()
  {
    this.dataShare.activeMenu.subscribe(
      (x)=>{

        console.log('selectedMenu',x);
        
        // if(x.toLowerCase() == "cc")
        // {
        //   console.log('selectedMenu',x);
          
        //   this.showFU = false;
        //   this.showCC = true;
        //   this.showAC = false;
        // }
        // else if(x.toLowerCase() == "chc")
        // {
        //   console.log('selectedMenu',x);
        //   this.showFU = false;
        //   this.showCC = false;
        //   this.showAC = true;
        // }
    });
  }

  FileUploadLink()
  {    
    this.showFU = true;
    this.showCC = false;
    this.showAC = false;
    this.dataShare.activeMenu.next("fu");
    this.route.navigate(['/fu']);
    
  }

  CreateContentLink()
  {
    this.showFU = false;
    this.showCC = true;
    this.showAC = false;  
    this.dataShare.activeMenu.next("cc");  
    this.route.navigate(['/cc', {queryParams : { e:'n' }}]);
  }
  AvailableContentLink()
  {
    this.showFU = false;
    this.showCC = false;
    this.showAC = true;    
    this.dataShare.fupload.next(false);
    this.dataShare.activeMenu.next("chc");  
    this.route.navigate(['/chc']);
  }

}
