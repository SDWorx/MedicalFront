import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisteredDevice } from 'src/app/Model/RegisteredDevice';
import { FetchIp } from 'src/app/Model/FetchIp';
import { IpConfig } from 'src/app/models/ipconfig.model';
import { DeviceIpService } from 'src/app/services/deviceip/deviceip.service';
import { IpconfigService } from 'src/app/services/ipconfig.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  id: number;
  ipAddress: string;
  detail: string;
  header: string;
  ipconfig: IpConfig;

  ipFetch : FetchIp;

  constructor(
    private router: Router,
    private deviceIp : DeviceIpService,
    private route: ActivatedRoute,
    private ipconfigservice: IpconfigService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.header = this.id === 0 ? 'Add IP Address' : 'Edit IP Address';

    if (this.id != 0) {
      // this.id= +this.route.snapshot.paramMap.get('ipAddress');
      this.ipAddress = this.route.snapshot.paramMap.get('ipAddress');
    }
  }

//   onDelete(id:number){
// this.ipconfigservice.onDelete(id);

//   }

  onSubmit() {
    let ipconfig: IpConfig = {
      id: this.id,
      ipAddress: this.ipAddress,
    };

    if (this.id === 0) {
      this.ipconfigservice
        .addRegisteredDevice(ipconfig)
        .subscribe((data) => {});
    } else {
      this.ipconfigservice
        .updateRegisteredDevice(ipconfig)
        .subscribe((data) => {});
    }

    this.router.navigateByUrl('config');
  }

  fetchApi(){
    this.deviceIp.getIPAddress().subscribe(
      data => {
        console.log(data);
        this.ipAddress = data['ip'];
        console.log(this.detail)
      }
    );
  }
}
