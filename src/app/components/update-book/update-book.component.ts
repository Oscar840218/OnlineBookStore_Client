import { BookService } from './../../service/book.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../../models/book';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {

  form: FormGroup;
  processing = false;
  message;
  messageClass;
  book:Book;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private bookService: BookService
  ) { }

  ngOnInit() {
    if(this.bookService.book==undefined) {
      this.router.navigate(['/bookshell']);
    } else {
      this.book = this.bookService.book;
      this.createForm(this.book);
      this.setValueIntoForm(this.book);
    }
    
  }

  createForm(book) {
    this.form = this.formBuilder.group({
      title: [book.title, Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30),
        this.validateBookName
      ])],
      author: [book.author, Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20),
        this.validateAuthorName
      ])],
      price: [book.price, Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(6),
        this.validateNumber
      ])],
      date: [book.date, Validators.compose([
        Validators.required
      ])],
      type: [book.type, Validators.compose([
        Validators.required
      ])],
      status: [book.status, Validators.compose([
        Validators.required
      ])],
      description: [book.description, Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ])]
    })
  }

  setValueIntoForm(book) {
    if(book.status=="ReadOnly") {
      this.form.controls['price'].disable();
    }
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

  onUpdateSubmit() {
    if(window.confirm('Are sure you want to update this book ?')){
      this.processing = true;
      this.disableForm();

      const book:Book = {
        id: this.book.id,
        title: this.form.get("title").value,
        type: this.form.get("type").value,
        date: this.form.get("date").value,
        author: this.form.get("author").value,
        price: this.form.get("price").value,
        status: this.form.get("status").value,
        description: this.form.get("description").value,
      }
      
      this.bookService.updateBook(book).subscribe(statusCode=>{
        if(statusCode!=200) {
          this.processing = false;
          this.enableForm();
          this.setValueIntoForm(this.book);
          this.messageClass = "alert alert-danger";
          this.message = "Server error";
        } else {
          this.messageClass = "alert alert-success";
          this.message = "Update success!";
          setTimeout(() => {
            this.router.navigate(['/bookshell']);
          },1000)
        }
      });
      

      
    }
  }

  onBack() {
    this.router.navigate(['/bookshell']);
  }

}
