import { BookService } from './../../service/book.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../../models/book';
import { FileHolder } from 'angular2-image-upload';

@Component({
  selector: 'app-register-book',
  templateUrl: './register-book.component.html',
  styleUrls: ['./register-book.component.css']
})
export class RegisterBookComponent implements OnInit {

  form: FormGroup;
  processing = false;
  message;
  messageClass;
  images:Array<any>=[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private bookService: BookService
  ) { 
    this.createForm();
  }

  ngOnInit() {
    
  }

  createForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30),
        this.validateBookName
      ])],
      author: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20),
        this.validateAuthorName
      ])],
      price: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(6),
        this.validateNumber
      ])],
      date: ['', Validators.compose([
        Validators.required
      ])],
      type: ['', Validators.compose([
        Validators.required
      ])],
      status: ['', Validators.compose([
        Validators.required
      ])],
      description: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ])]
    })
  }

  validateBookName(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9\!\'\s\"\$\&']+$/);

    if (regExp.test(controls.value)) {
      return null;
    } else {
        return { 'validateBookName': true };
    }

  }

  validateAuthorName(controls) {
    const regExp = new RegExp(/^[a-zA-Z]/);

    if (regExp.test(controls.value)) {
      return null;
    } else {
        return { 'validateAuthorName': true };
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
  onReadOnlyClick() {
    this.form.controls['price'].disable();
  }

  onRentClick() {
    this.form.controls['price'].enable();
  }

  onSellClick() {
    this.form.controls['price'].enable();
  }

  onUploadFinished(file:FileHolder) {
    this.images.push(file);
    console.log(file);
  }

  onRemoved(file: FileHolder) {
    const index:number = this.images.indexOf(file);
    this.images.splice(index);
  }

  disableForm(){
    this.form.controls['title'].disable();
    this.form.controls['author'].disable();
    this.form.controls['date'].disable();
    this.form.controls['type'].disable();
    this.form.controls['price'].disable();
    this.form.controls['status'].disable();
    this.form.controls['description'].disable();
  }

  enableForm(){
    this.form.controls['title'].enable();
    this.form.controls['author'].enable();
    this.form.controls['date'].enable();
    this.form.controls['type'].enable();
    this.form.controls['price'].enable();
    this.form.controls['status'].enable();
    this.form.controls['description'].enable();
  }

  onRegisterSubmit() {
    this.processing = true;
    this.disableForm();
  
    const book:Book = {
      title: this.form.get("title").value,
      type: this.form.get("type").value,
      date: this.form.get("date").value,
      author: this.form.get("author").value,
      price: this.form.get("price").value,
      bookPic: this.images,
      status: this.form.get("status").value,
      description: this.form.get("description").value,
    }
    
    this.bookService.addNewBook(book).subscribe(statusCode=>{
      if(statusCode!=201) {
        this.message = "Server Error";
        this.messageClass = "alert alert-danger";
      } else {
        this.message = "Register Book Success!"
        this.messageClass = "alert alert-success";
        setTimeout(() => {
          this.router.navigate(['/bookshell']);
        },2000)
      }
      
    })

  }

}
