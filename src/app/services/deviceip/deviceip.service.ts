import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RegisteredDevice } from 'src/app/Model/RegisteredDevice';
import { FetchIp } from 'src/app/Model/FetchIp';
import { IpConfig } from 'src/app/models/ipconfig.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceIpService  {

  constructor(private http: HttpClient) { }

  public getIPAddress()
  {
    return this.http.get('http://api.ipify.org/?format=json');
  }

  getRegisteredDevice(): Observable<any> {
    console.log(`${environment.apiUrl}/GetRegisteredDevice`);
    return this.http.get(`${environment.apiUrl}/GetRegisteredDevice`);
  }

  deleteRegisteredDevice(deviceId: Number) {
    return this.http.delete(
      `${environment.apiUrl}/DeleteRegisteredDevice?id=${deviceId}`
    );
  }

  addRegisteredDevice(newIp: IpConfig) {
    return this.http.post(`${environment.apiUrl}/AddRegisteredDevice`, {
      id: newIp.id,
      ipAddress: newIp.ipAddress,
    });
  }

  updateRegisteredDevice(ipconfig: IpConfig) {
    return this.http.put(`${environment.apiUrl}/UpdateRegisteredDevice`, {
      id: ipconfig.id,
      ipAddress: ipconfig.ipAddress,
    });
  }
}
