import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IpConfig } from '../models/ipconfig.model';

@Injectable({
  providedIn: 'root',
})
export class IpconfigService {
  ipconfiguration: IpConfig[];

  constructor(private http: HttpClient) {}

  getRegisteredDevice(): Observable<any> {
    return this.http.get(`${environment.apiUrl2}/GetRegisteredDevice`);
  }

  deleteRegisteredDevice(deviceId: Number) {
    return this.http.delete(
      `${environment.apiUrl2}/DeleteRegisteredDevice?id=${deviceId}`
    );
  }

  addRegisteredDevice(newIp: IpConfig) {
    return this.http.post(`${environment.apiUrl2}/AddRegisteredDevice`, {
      id: newIp.id,
      ipAddress: newIp.ipAddress,
    });
  }

  updateRegisteredDevice(ipconfig: IpConfig) {
    return this.http.put(`${environment.apiUrl2}/UpdateRegisteredDevice`, {
      id: ipconfig.id,
      ipAddress: ipconfig.ipAddress,
    });
  }

  // onGet(){
  //       return this.ipconfiguration;
  // }

  // onGetIpConfig(id: Number){
  // return this.ipconfiguration.find(x=>x.id === id);

  // }

  // onAdd(ipconfig: IpConfig){
  // this.ipconfiguration.push(ipconfig);
  // }

  // onDelete(id: Number){

  //   let ipconfig = this.ipconfiguration.find(x=>x.id === id);
  //   let index = this.ipconfiguration.indexOf(ipconfig,0);
  //   this.ipconfiguration.splice(index,1);
  // }

  // onUpdate(ipconfig: IpConfig){
  //   let oldipconfig = this.ipconfiguration.find(x=>x.id === ipconfig.id);

  // }
}
