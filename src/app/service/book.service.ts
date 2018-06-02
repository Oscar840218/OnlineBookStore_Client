import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Book } from '../models/book';

@Injectable()
export class BookService {

  private baseUrl:string = "http://localhost:8080/books";
  private authToken;
  private options;
  public book:Book;

  constructor(private http:Http) { }

  addNewBook(book:Book) {
    this.createAuthenticationHeaders();
    return this.http.post(this.baseUrl+"/new", JSON.stringify(book), this.options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  deleteBook(id:Number) {
    this.createAuthenticationHeaders();
    return this.http.delete(this.baseUrl+"/delete/"+ id, this.options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  updateBook(book:Book) {
    this.createAuthenticationHeaders();
    return this.http.put(this.baseUrl+"/update", JSON.stringify(book), this.options)
    .map(success => success.status)
    .catch(this.handleError);
  }

  getBooks(email:string) {
    this.createAuthenticationHeaders();
    return this.http.get(this.baseUrl+"/all/"+email, this.options)
      .map((response:Response)=>response.json())
      .catch(this.handleError);
  }

  getBookDetail(bookId, uploadUserId) {
    this.createAuthenticationHeaders();
    return this.http.get(this.baseUrl+"/detail/"+bookId+"/"+uploadUserId,this.options)
    .map((response:Response)=>response.json())
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

  private handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }

}
