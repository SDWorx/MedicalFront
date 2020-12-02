import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DeviceIpService } from 'src/app/services/deviceip/deviceip.service';
import { RegisteredDevice } from 'src/app/Model/RegisteredDevice';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  LoginForm: FormGroup;
  route: string;
  paths: String[];
  pinInserted:any;
  type: string;
  currentDeviceIp: string;
  registeredDevice: RegisteredDevice[];
  deviceCanMakeClaim: boolean = false;

  constructor(private router: Router,private location: Location, private authService: AuthService, private ip: DeviceIpService) {
    router.events.subscribe((val) => {
      this.route = location.path().substring(1);
      //this.paths = this.route.split('');
    });

    
  }
  logout() {
    this.authService.logout();
  }
  goMessenger() {
    this.pinInserted = this.LoginForm.value.pin;
    this.LoginForm.reset();
    if (this.pinInserted == '1234') {
      this.router.navigate(['/messenger']);
    } else {
      Swal.fire('Oops...', 'You have enter a wrong pin!', 'error');
      this.router.navigate(['']);
    }
  }
  ngOnInit(): void {
    this.getMachineIP();
    this.LoginForm = new FormGroup({
      pin: new FormControl(),
    });

    const user = sessionStorage.getItem('user');
    console.log("user "+ user);
    this.type = user;

    // this.getMachineIP();
    // console.log("machine IP is " + this.currentDeviceIp);
    // this.getRegisteredDeviceIPAddress();
    // console.log("array of devices ip : " + this.registeredDevice);
    // this.deviceCanMakeClaim = this.CheckIfIpExistInDatabase(this.currentDeviceIp);
    // console.log("Device can make claim = " + this.deviceCanMakeClaim);

    
    
   
  }

  getMachineIP()
  {
    this.ip.getIPAddress().subscribe(
      (res:any)=>
      {
      this.currentDeviceIp=res.ip;
      this.ip.getRegisteredDevice().subscribe
      (
        (res: RegisteredDevice[]) =>
        {
          this.registeredDevice = res;
          console.log("array of devices ip : " + this.registeredDevice);

          let ipExists: boolean = false;

          for(let ipDatabase of res)
          {
            if(ipDatabase.ipAddress === this.currentDeviceIp)
            {
              ipExists = true;
              break;
            }
          }
          this.deviceCanMakeClaim= ipExists;
          console.log("Device can make claim = " + this.deviceCanMakeClaim);
        }
      );
      
     // this.deviceCanMakeClaim = this.CheckIfIpExistInDatabase(this.currentDeviceIp);
      console.log("///////////" + this.deviceCanMakeClaim);
      
    });
    
  }

  CheckIfIpExistInDatabase(deviceIp:string):boolean{
    let ipExists: boolean = false;

    for(let ipDatabase in this.registeredDevice)
    {
      if(ipDatabase === deviceIp)
      {
        ipExists = true;
        break;
      }
    }
    return ipExists;

  }

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
}
