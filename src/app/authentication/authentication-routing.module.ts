import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';


const routes: Routes = [  
  {path:'', redirectTo:'si', pathMatch:'full'},
  {path:'si', component:SignInComponent},
  {path:'su', component:SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }

export const authComponents = [SignInComponent, SignUpComponent];
