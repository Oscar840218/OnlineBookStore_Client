import { CustomerSecurity } from './../../models/customer-security';
import { Customer } from './../../models/customer';
import { CustomerDetail } from './../../models/customer-detail';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  form: FormGroup;
  processing = false;
  message;
  messageClass;
  
  constructor(
    private customerService:CustomerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(30)
      ])],
      firstName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        this.validateUsername
      ])],
      lastName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        this.validateUsername
      ])],
      gender: ['', Validators.compose([
        Validators.required
      ])],
      city: ['', Validators.compose([
        Validators.required
      ])],
      zip: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(8),
        this.validateNumber
      ])],
      age: ['', Validators.compose([
        Validators.required
      ])],
      loveBookType: ['', Validators.compose([
        Validators.required
      ])],
      hobby: ['', Validators.compose([
        Validators.required
      ])],
      hint: ['', Validators.compose([
        Validators.required
      ])],
      address: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50),
        this.validateUsername
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35),
        this.validatePassword
      ])],
      confirm: ['', Validators.required]
    },{ validator: this.matchingPasswords('password','confirm') })
  }

  validateUsername(controls) {
    const regExp = new RegExp(/^[a-zA-Z]+$/);

    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateUsername': true };
    }

  }

  validateNumber(controls) {
    const regExp = new RegExp(/^[0-9]/);

    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateNumber': true };
    }

  }

  validatePassword(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);

    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validatePassword': true };
    }

  }

  matchingPasswords(password,confirm){
    return (group: FormGroup) => {
      if (group.controls[password].value === group.controls[confirm].value) {
        return null;
      } else {
        return { 'matchingPasswords': true };
      }
    }
  }

  disableForm(){
    this.form.controls['email'].disable();
    this.form.controls['firstName'].disable();
    this.form.controls['password'].disable();
    this.form.controls['confirm'].disable();
    this.form.controls['lastName'].disable();
    this.form.controls['gender'].disable();
    this.form.controls['hint'].disable();
    this.form.controls['address'].disable();
    this.form.controls['city'].disable();
    this.form.controls['zip'].disable();
    this.form.controls['age'].disable();
    this.form.controls['loveBookType'].disable();
    this.form.controls['hobby'].disable();
  }

  enableForm(){
    this.form.controls['email'].enable();
    this.form.controls['firstName'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirm'].enable();
    this.form.controls['lastName'].enable();
    this.form.controls['gender'].enable();
    this.form.controls['hint'].enable();
    this.form.controls['address'].enable();
    this.form.controls['city'].enable();
    this.form.controls['zip'].enable();
    this.form.controls['age'].enable();
    this.form.controls['loveBookType'].enable();
    this.form.controls['hobby'].enable();
  }

  onRegisterSubmit() {
    this.processing = true;
    this.disableForm();

    const customerDetail:CustomerDetail = {
      age: this.form.get("age").value,
      gender: this.form.get("gender").value,
      loveBookType: this.form.get("loveBookType").value,
      hobby: this.form.get("hobby").value,
      address: this.form.get("zip").value+this.form.get("city").value+this.form.get("address").value
    }

    const customerSecurity:CustomerSecurity = {
      password: this.form.get("password").value,
      hint: this.form.get("hint").value
    }

    const customer: Customer = {
      firstName: this.form.get("firstName").value,
      lastName: this.form.get("lastName").value,
      email: this.form.get('email').value,
      customerDetail: customerDetail,
      customerSecurity: customerSecurity
    }

    this.customerService.addCustomer(customer).subscribe(statusCode => {
      if(statusCode!=201) {
        this.messageClass = 'alert alert-danger'; 
        this.message = "Register failed";
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success';
         this.message = "Register success";
         setTimeout(() => {
           this.router.navigate(['/login']);
         },2000)
      }
    })
    
  }

}
