import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserData } from 'src/app/pages/viewclaim/viewclaim.component';
import { StorageService } from 'src/app/services/auth/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient,
    private storageService: StorageService) {}

  getUsers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/claims`);
  }

  getClaimByUserID(UserData): Observable<any>{
    //let empid = sessionStorage.getItem('employeeId');
    let empid = this.storageService.getCookie('id');
    return this.http.post(`${environment.apiUrl2}/GetClaimsById?employeeId=${empid}`, {UserData});
  }

  getSpecificUser(): Observable<any> {
    let param = new HttpParams().set('claim_id', "10");
    return this.http.get(`${environment.apiUrl}/Claims`,{params: param})
  }

  getStats(dateFrom, dateTo) {
    let url = `${environment.apiUrl}/range?dateFrom=${dateFrom}&dateTo=${dateTo}`;
    console.log(dateFrom, dateTo, url);
    return this.http.get(url);
  }
}
