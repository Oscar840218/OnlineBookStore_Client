import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private customerService:CustomerService,
    private flashMessagesService:FlashMessagesService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  onLogOut() {
    this.customerService.logout();
    this.flashMessagesService.show('You are logged out', {cssClass:'alert alert-info'});
    this.router.navigate(['/']);
  }

}
