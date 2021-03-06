import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MessengerService } from 'src/app/services/messenger/messenger.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css'],
})
export class MessengerComponent implements OnInit {
  messengerForm = new FormGroup({
    claims: new FormControl(),
    received: new FormControl(),
  });

  @Input() received;

  details ={
    date:'',
    batchID: '',
    claimed: '',
    collected: '',
    status: ''
  };

  constructor(
    private MessengerService: MessengerService,
    private router: Router
  ) {}
  goback() {
    this.router.navigate(['/viewClaim']);
  }

  checkData(){
    this.details.collected = this.messengerForm.get('received').value;
    let myContainer = document.getElementById('displayWarning') as HTMLInputElement;

    if(this.details.collected == this.details.claimed){
      myContainer.innerHTML ="";
    }
    else if(this.details.collected !== this.details.claimed){
      myContainer.innerHTML ="Possible Mismatch";
    }
  }
  submit() {
    // Swal.fire('Envelope collected', 'New Batch initiate', 'success');
    // this.router.navigate(['/employee']);
    // this.MessengerService.updateBatch().subscribe(
    //   (data) => {
    //     // this.router.navigate(['/employee']);
    //   }
    // );


    this.details.collected = this.messengerForm.get('received').value;

    this.MessengerService.addSummary(this.details.batchID, this.details.claimed, this.details.collected, this.details.status).subscribe(
      (data1)=> {
        this.MessengerService.createBatch().subscribe((data) => {
          // if(this.details.collected !== this.details.claimed){
          //   Swal.fire('Possible mismatch','Envelopes number may not match', 'error').then(() => {
          //     this.router.navigate(['/viewClaim']);
          //   });
          // } else{
            Swal.fire('Registered details','Successfully added','success').then((result) => {
              if (result.value) {
                this.router.navigate(['/viewClaim']);
              }
            });
          //}
          
        });
      }
    );

  }
  ngOnInit(): void {
    var count;

    this.MessengerService.Count().subscribe((data) => {
      count = data;
      this.messengerForm.setValue({"claims":data[0],"received":data[0]})

      this.details.claimed = data[0];
      this.details.batchID = data[1];

    });
  }
  employee() {
    this.router.navigate(['/claimForm']);
  }
}
