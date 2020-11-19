import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IpConfig } from 'src/app/models/ipconfig.model';
import { IpconfigService } from 'src/app/services/ipconfig.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id:number;
  header:string;
  ipconfig: IpConfig = {

    id:0,
    name:'',
    phone:0,
    email:''

  };

  constructor(private router: Router, private route: ActivatedRoute, private ipconfigservice:IpconfigService) { }

  ngOnInit(): void {
    this.id= +this.route.snapshot.paramMap.get('id');
    this.header =this.id === 0? 'Add IP Address':'Edit IP Address';
  
  if (this.id != 0){
    this.ipconfig= this.ipconfigservice.onGetIpConfig(this.id);
  }

  }

  onSubmit(form: NgForm){
    let ipconfig: IpConfig = {
    id: form.value.id,
    name: form.value.name,
    email: form.value.email,
    phone: form.value.phone,

    }


    if(this.id === 0){
    this.ipconfigservice.onAdd(ipconfig);
    }
    else{
      this.ipconfigservice.onUpdate(ipconfig);
    }

    this.router.navigateByUrl('');
  }

}
