import { RegisteredDevice } from './../../Model/RegisteredDevice';
import { DeviceIpService } from './../../services/deviceip/deviceip.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-deviceip',
  templateUrl: './deviceip.component.html',
  styleUrls: ['./deviceip.component.scss']
})
export class DeviceipComponent implements OnInit {
  constructor(private ip: DeviceIpService){}
  title = 'DemoApp';
  ipAddress: string;
  registeredDevice: RegisteredDevice[];
  ngOnInit()
  {
    this.getRegisteredDeviceIPAddress;
    this.getMachineIP();
  }
  getMachineIP()
  {
    this.ip.getIPAddress().subscribe(
      (res:any)=>
      {
      this.ipAddress=res.ip;
    });
  }

  // gets list of registered device ip in database
  getRegisteredDeviceIPAddress()
  {
    this.ip.getRegisteredDevice().subscribe
    (
      (res: RegisteredDevice[]) =>
      {
        this.registeredDevice = res;
      }
    )
  }

  // checkIfIpExists(machineIp:string)
  // {
  //   this.getRegisteredDeviceIPAddress;
  //   let exists: boolean = false;
  //   for(let device in this.registeredDevice)
  //   {
  //     if (machineIp === device.)
  //     {
  //       exists = true;
  //     }
  //   }
  // }


}
