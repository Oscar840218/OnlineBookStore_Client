import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Customer } from '../models/customer';
import { CustomerDetail } from '../models/customer-detail';
import { CustomerSecurity } from '../models/customer-security';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class CustomerService {

  private baseUrl:string = "http://localhost:8080/customers";
  private authToken;
  private user;
  private options;

  constructor(private http:Http) { }

  login(user) {
    return this.http.post(this.baseUrl+"/login",JSON.stringify(user))
      .map((response:Response)=>response.json());
  }

  logout() {
    this.authToken = null;
    this.user = null;
    console.log("user logout");
    localStorage.clear();
  }

  getProfile() {
    this.createAuthenticationHeaders();
    return this.http.get(this.baseUrl+"/profile", this.options)
      .map((response:Response)=>response.json())
      .catch(this.handleError);

  }

  addCustomer(customer:Customer) {
    return this.http.post(this.baseUrl+"/new", customer)
    .map(success => success.status)
    .catch(this.handleError);
   
  }

  createAuthenticationHeaders() {
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        "Content-Type":"application/json",
        "authorization":this.authToken
      })
    });
  }

  loadToken() {
    this.authToken = localStorage.getItem('token');
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);
    this.authToken = token;
    this.user = user;
  }

  loggedIn() {
    return tokenNotExpired();
  }
  
  private handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}
