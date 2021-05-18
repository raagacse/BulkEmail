import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule, authComponents } from './authentication-routing.module';
import { EmailModule } from '../email/email.module';
import { BrowserModule } from '@angular/platform-browser';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    authComponents
  ],
  imports: [    
    BrowserModule,
    CommonModule,
    FormsModule,  
    AuthenticationRoutingModule,
    EmailModule,
    MatProgressBarModule
  ]
})
export class AuthenticationModule { }
