import { Component, OnInit } from '@angular/core'
import { IpConfig } from 'src/app/models/ipconfig.model';
import { IpconfigService } from 'src/app/services/ipconfig.service';

@Component({

    templateUrl: './config.component.html',
    styleUrls: ['./config.component.css']
})

export class ConfigComponent implements OnInit {

  ipconfiguration: IpConfig[];
  constructor(private ipconfigservice: IpconfigService){}

  ngOnInit():void{
    this.ipconfigservice.getRegisteredDevice().subscribe((data) => {
      this.ipconfiguration = data;
    })
  }

  onDelete(id: Number)
  {
    console.log(id);
    this.ipconfigservice.deleteRegisteredDevice(id).subscribe((data)=>{
      this.ipconfigservice.getRegisteredDevice().subscribe((data) =>
      {
        this.ipconfiguration = data;
      });

    });
  }

}


// onDelete(id: Number){

//     this.ipconfigservice.onDelete(id);
// }




