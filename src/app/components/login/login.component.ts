import { AuthGuard } from './../../guards/auth.guard';
import { CustomerService } from './../../service/customer.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  messageClass;
  message;
  processing = false;
  form: FormGroup;
  previousUrl;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
    private authGuard:AuthGuard
  ) { 
    this.createForm();
  }

  ngOnInit() {
    if(this.authGuard.redirectUrl) {
      this.messageClass = "alert alert-danger";
      this.message = "Please login first"
      this.previousUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined;
    }
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  disableForm() {
    this.form.controls['email'].disable();
    this.form.controls['password'].disable();
  }

  enableForm() {
    this.form.controls['email'].enable();
    this.form.controls['password'].enable();
  }

  onLoginSubmit() {
    this.processing = true;
    this.disableForm();

    const user = {
      email: this.form.get('email').value,
      password: this.form.get('password').value
    }

    this.customerService.login(user).subscribe(data => {
      if(data.success=="false") {
        this.messageClass = 'alert alert-danger'; 
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.customerService.storeUserData(data.token, data.userName);
        setTimeout(() => {
            this.router.navigate(['/profile']);
        },2000)
      }
    });
  }

}
