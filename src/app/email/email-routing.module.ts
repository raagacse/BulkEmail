import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateContentComponent } from './create-content/create-content.component';
import { ChooseContentComponent } from './choose-content/choose-content.component';
import { FileUploadNewComponent } from './file-upload-new/file-upload-new.component';
import { HomeComponent } from './home/home.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { SignInComponent } from '../authentication/sign-in/sign-in.component';
import { UploadHistoryComponent } from './upload-history/upload-history.component';
import { ScheduledRptComponent } from './scheduled-rpt/scheduled-rpt.component';

const routes: Routes = [    
  {path:'hm', component:HomeComponent},      
  {path:'fu', component:FileUploadNewComponent},
  {path:'cc', component:CreateContentComponent},
  {path:'chc', component:ChooseContentComponent},  
  {path:'se', component: SendEmailComponent },
  {path:'uh', component: UploadHistoryComponent },
  {path:'srpt', component: ScheduledRptComponent },
  {path:'*', component: SignInComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule { }

export const emailComponents = [   
  HomeComponent,
  FileUploadNewComponent, 
  CreateContentComponent, 
  ChooseContentComponent];
