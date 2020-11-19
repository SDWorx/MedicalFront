import { Injectable } from '@angular/core';
import {IpConfig} from '../models/ipconfig.model'

@Injectable({
  providedIn: 'root'
})
export class IpconfigService {

  ipconfiguration: IpConfig[]=[

{
  id:1,
  name:"employee1",
  email:"employee1@gmail.com",
  phone:222
},
{
  id:2,
  name:"employee2",
  email:"employee2@gmail.com",
  phone:222
},


  ];

  constructor() { }
onGet(){
  return this.ipconfiguration;
}

onGetIpConfig(id: Number){
return this.ipconfiguration.find(x=>x.id === id);

}

onAdd(ipconfig: IpConfig){
this.ipconfiguration.push(ipconfig);
}

onDelete(id: Number){

  let ipconfig = this.ipconfiguration.find(x=>x.id === id);
  let index = this.ipconfiguration.indexOf(ipconfig,0);
  this.ipconfiguration.splice(index,1);
}

onUpdate(ipconfig: IpConfig){
  let oldipconfig = this.ipconfiguration.find(x=>x.id === ipconfig.id);
  oldipconfig.name=ipconfig.name;
  oldipconfig.email=ipconfig.email;
  oldipconfig.phone=ipconfig.phone;


}

}
