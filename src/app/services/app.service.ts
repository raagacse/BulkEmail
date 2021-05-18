import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClsContent, ClsSaveContent, ClsSendEmailContent, ClsEmailStatus, ClsUploadHistory, ClsUploadId, ClsScheduledRpt, ClsScheduledEmailStatus, ClsEmailFrom } from '../email/model/email-dtl';
import { UserInfo } from '../authentication/auth-model/user-info';

@Injectable({
    providedIn: 'root'
})

export class AppService {

    public token: string;
    constructor(private http: HttpClient) {

    }

    Authentication(userInfo: UserInfo): Observable<any> {
        let url = environment.apiauthURL + "/authenticate";
        const httpHeader = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.post(url, userInfo, httpHeader);
    }

    FileUpload(formData: any): Observable<any> {
        let val = JSON.parse(sessionStorage.getItem('userInfo'));
        this.token = val.token;

        let httpHeaders = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
        })

        let url = environment.apiURL + "/fu";
        return this.http.post<any>(url, formData, { headers: httpHeaders, reportProgress: true, observe: 'events' });
    }

    EmailContent(contentId: number): Observable<ClsContent[]> {
        let val = JSON.parse(sessionStorage.getItem('userInfo'));
        this.token = val.token;

        const httpHeader = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            })
        };

        let url = environment.apiURL + "/econt";
        return this.http.post<ClsContent[]>(url, contentId, httpHeader);
    }

    GetEmailFromLst(): Observable<ClsEmailFrom[]> {
        let val = JSON.parse(sessionStorage.getItem('userInfo'));
        this.token = val.token;

        const httpHeader = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            })
        };

        let url = environment.apiURL + "/efl";
        return this.http.get<ClsEmailFrom[]>(url, httpHeader);
    }

    SaveEmailContent(econtent: ClsSaveContent): Observable<Boolean> {
        let val = JSON.parse(sessionStorage.getItem('userInfo'));
        this.token = val.token;

        const httpHeader = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            })
        };

        let url = environment.apiURL + "/sec";
        return this.http.post<Boolean>(url, econtent, httpHeader);
    }

    EditEmailContent(emailContent: ClsContent): Observable<Boolean> {
        let val = JSON.parse(sessionStorage.getItem('userInfo'));
        this.token = val.token;

        const httpHeader = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            })
        };

        let url = environment.apiURL + "/ed";
        return this.http.post<Boolean>(url, emailContent, httpHeader);
    }

    DeleteEmailContent(contentId: number): Observable<Boolean> {
        let val = JSON.parse(sessionStorage.getItem('userInfo'));
        this.token = val.token;

        const httpHeader = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            })
        };

        let url = environment.apiURL + "/de";
        return this.http.post<Boolean>(url, contentId, httpHeader);
    }

    SendEmail(emailContent: ClsSendEmailContent): Observable<ClsEmailStatus[]> {
        let val = JSON.parse(sessionStorage.getItem('userInfo'));
        this.token = val.token;

        const httpHeader = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            })
        };

        let url = environment.apiURL + "/se";
        return this.http.post<ClsEmailStatus[]>(url, emailContent, httpHeader);
    }

    ScheduleEmailContent(emailContent: ClsSendEmailContent): Observable<boolean> {
        let val = JSON.parse(sessionStorage.getItem('userInfo'));
        this.token = val.token;

        const httpHeader = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            })
        };

        let url = environment.apiURL + "/schedule";
        return this.http.post<boolean>(url, emailContent, httpHeader);
    }

    UploadHistory(): Observable<ClsUploadHistory[]> {
        let val = JSON.parse(sessionStorage.getItem('userInfo'));
        this.token = val.token;

        const httpHeader = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            })
        };

        let url = environment.apiURL + "/uh";
        return this.http.get<ClsUploadHistory[]>(url, httpHeader);
    }

    ScheduledRpt(): Observable<ClsScheduledRpt[]> {
        let val = JSON.parse(sessionStorage.getItem('userInfo'));
        this.token = val.token;

        const httpHeader = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            })
        };

        let url = environment.apiURL + "/scheduledrpt";
        return this.http.get<ClsScheduledRpt[]>(url, httpHeader);
    }

    GetEmailSendStatus(emailUpload: ClsUploadId): Observable<ClsEmailStatus[]> {
        let val = JSON.parse(sessionStorage.getItem('userInfo'));
        this.token = val.token;

        const httpHeader = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            })
        };

        let url = environment.apiURL + "/ess";
        return this.http.post<ClsEmailStatus[]>(url, emailUpload, httpHeader);
    }

    ScheduledEmailStatus(emailUpload: ClsUploadId): Observable<ClsScheduledEmailStatus[]> {
        let val = JSON.parse(sessionStorage.getItem('userInfo'));
        this.token = val.token;

        const httpHeader = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            })
        };

        let url = environment.apiURL + "/scheduledstatus";
        return this.http.post<ClsScheduledEmailStatus[]>(url, emailUpload, httpHeader);
    }

    DeleteUpload(uploadIdLst: ClsUploadId[]): Observable<boolean> {
        let val = JSON.parse(sessionStorage.getItem('userInfo'));
        this.token = val.token;

        const httpHeader = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            })
        };
        console.log('service', uploadIdLst);

        let url = environment.apiURL + "/delupload";
        return this.http.post<boolean>(url, uploadIdLst, httpHeader);
    }



    DownloadEmailStatus_Excel(uploadId: ClsUploadId): Observable<any> {
        let val = JSON.parse(sessionStorage.getItem('userInfo'));
        this.token = val.token;

        let url = environment.apiURL + "/esexcel";
        return this.http.post(url, uploadId, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            }), observe: 'response', responseType: 'blob'
        });
    }

    Download_Scheduled_EmailStatus_Excel(uploadId: ClsUploadId): Observable<any> {
        let val = JSON.parse(sessionStorage.getItem('userInfo'));
        this.token = val.token;

        let url = environment.apiURL + "/sesexcel";
        return this.http.post(url, uploadId, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            }), observe: 'response', responseType: 'blob'
        });
    }
    /*
    GetSVDRptExcel(svd: ClsRptParameterNew):Observable<any>
    { 
        this.apiDomain = environment.app_api_base_url;

        this.apiMethod = "/api/SVRptM/SVRptDS";
        this.apiURL = this.apiDomain + this.apiMethod;    
        return this.http.post(this.apiURL, svd, {observe:'response', responseType:'blob' });
    }
     */

}