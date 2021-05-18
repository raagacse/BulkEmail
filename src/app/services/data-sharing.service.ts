import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClsContent, ClsEmail } from '../email/model/email-dtl';


@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  public loggedIn = new BehaviorSubject<boolean>(false);
  public emailList = new BehaviorSubject<ClsEmail[]>([]);
  public shareEmailContent = new BehaviorSubject<ClsContent>(new ClsContent(0,"","",""));
  public fupload = new BehaviorSubject<boolean>(true);
  public activeMenu = new BehaviorSubject<string>('fu');
  
  constructor() { }
}
