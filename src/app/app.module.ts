import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationModule } from './authentication/authentication.module';
import { EmailModule } from './email/email.module';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SanitizeHtmlPipe } from './services/sanitize-html.pipe';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,    
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AuthenticationModule,
    EmailModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
