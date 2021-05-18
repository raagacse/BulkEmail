import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmailRoutingModule, emailComponents } from './email-routing.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { SanitizeHtmlPipe } from '../services/sanitize-html.pipe';
import { SendEmailComponent } from './send-email/send-email.component';
import { UploadHistoryComponent } from './upload-history/upload-history.component';
import { ScheduledRptComponent } from './scheduled-rpt/scheduled-rpt.component';

@NgModule({
  declarations: [    
    emailComponents,
    SanitizeHtmlPipe,
    SendEmailComponent,
    UploadHistoryComponent,
    ScheduledRptComponent
  ],
  imports: [    
    CommonModule,
    FormsModule,
    EmailRoutingModule,
    HttpClientModule,
    MatProgressBarModule
  ]
})
export class EmailModule { }
