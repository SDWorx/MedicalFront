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
    console.log(`${environment.url}/GetRegisteredDevice`);
    return this.http.get(`${environment.url}/GetRegisteredDevice`);
  }


  deleteRegisteredDevice(deviceId: Number) {
    return this.http.delete(
      `${environment.url}/DeleteRegisteredDevice?id=${deviceId}`
    );
  }

  addRegisteredDevice(newIp: IpConfig) {
    return this.http.post(`${environment.url}/AddRegisteredDevice`, {
      id: newIp.id,
      ipAddress: newIp.ipAddress,
    });
  }

  updateRegisteredDevice(ipconfig: IpConfig) {
    return this.http.put(`${environment.url}/UpdateRegisteredDevice`, {
      id: ipconfig.id,
      ipAddress: ipconfig.ipAddress,
    });
  }

}
