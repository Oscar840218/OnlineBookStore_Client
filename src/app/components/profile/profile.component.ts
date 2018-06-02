import { CustomerService } from './../../service/customer.service';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  customer:Customer;
  messageClass;
  message;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getProfile().subscribe(data=>{
      if(data!=null) {
        this.customer = data;
      } else {
        this.messageClass = 'alert alert-danger'; 
        this.message = "Not provie token";
      }
      
    });
  }

}
