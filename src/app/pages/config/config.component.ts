import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { IpConfig } from 'src/app/models/ipconfig.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { IpconfigService } from 'src/app/services/ipconfig.service';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({

    templateUrl: './config.component.html',
    styleUrls: ['./config.component.css']
})

export class ConfigComponent implements OnInit {
  _loading = true;
  type: string;
  AlldataStatus: Array<IpConfig>;
  @ViewChild('TABLE') table: ElementRef;
  dataSource: MatTableDataSource <IpConfig> ;
  dataSourceStatus: MatTableDataSource<IpConfig>;
  displayedStatusColumns: string[] = [
    'id',
    'ipAddress',
    'data'
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  ipconfiguration: IpConfig[];
  constructor(private ipconfigservice: IpconfigService, private router: Router){}

  ngOnInit():void{
    this._loading=false;
    const firstTimeStatus = localStorage.getItem('key')
 if(!firstTimeStatus){
  this._loading=true;
  localStorage.setItem('key','loaded')
  location.reload()
 }else {
  this._loading=false;
   localStorage.removeItem('key') 
 }

    this.ipconfigservice.getRegisteredDevice().subscribe((dataStatus:Array<IpConfig>) => {
      this.AlldataStatus = dataStatus;

      this.ipconfiguration = dataStatus;
      this.dataSourceStatus = new MatTableDataSource(
        dataStatus.map((d) => {
          return {
            ...d,

          };
        })
      );
      console.log(dataStatus);

      //this.source = new LocalDataSource(this.data);
      // setTimeout(() => {this._loading=false},2000)
      this.dataSourceStatus.paginator = this.paginator;
      this.dataSourceStatus.sort = this.sort;
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

  changeRoute(){
    this.router.navigate(['/ipconfig/add/0']);
  }

}


// onDelete(id: Number){

//     this.ipconfigservice.onDelete(id);
// }




