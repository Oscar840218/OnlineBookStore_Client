import { CustomerService } from './../../service/customer.service';
import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../service/book.service';
import { Book } from '../../models/book';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bookshell',
  templateUrl: './bookshell.component.html',
  styleUrls: ['./bookshell.component.css']
})
export class BookshellComponent implements OnInit {

  books:Book[] = null;
  userEmail:string;
  message;
  messageClass;
  columnClass;
  processing = false;
  form: FormGroup;
  showEmailInput = false;
  buttonMessage = "Other's bookshell";
  defaultUserName;
  defaultUserId;
  otherUserId="";
  sub: any;

  constructor(
    private bookService:BookService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { 
    this.createForm();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params=> {
      this.userEmail = params['email'];
      if(this.userEmail!=undefined) {
        this.getUserBooks(this.userEmail);
      } else {
        this.getUserBooks("defaultUser");
      }
      
    });
        
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30),
        Validators.email
      ])]
    })
  }

  getUserBooks(userEmail) {
    this.bookService.getBooks(userEmail).subscribe(data=>{
      if (data==null) {
        this.message = data.message;
        this.messageClass = "alert alert-danger";
        this.form.controls['email'].enable();
        this.processing = false;
      } else {
        this.messageClass = "";
        this.books = data.books;
        this.defaultUserName = data.userName;
        this.defaultUserId = data.defaultUserId;
        this.otherUserId = data.otherUserId;
        this.showEmailInput = false;
        if(data.otherUserId!="") {
          this.buttonMessage = "Other's BookShell";
        }
      }
    })
  }

  openEmailInput() {
    if(this.showEmailInput) {
      this.showEmailInput = false;
      this.buttonMessage = "Other's BookShell";
    } else {
      this.showEmailInput = true;
      this.buttonMessage = "My BookShell";
    }
    
  }

  onBookUpdate(book) {
    this.bookService.book = book;
    this.router.navigate(['/update-book']);
  }

  onBookDelete(id) {
    if(window.confirm('Are sure you want to delete this book ?')){
      this.bookService.deleteBook(id).subscribe(statusCode=> {
        if(statusCode!=200) {
          this.message = "Server Error";
          this.messageClass = "alert alert-danger";
        } else {
          this.message = "Delete success!";
          this.messageClass = "alert alert-success";
          setTimeout(() => {
            this.refresh();
          },1000)
        }
      })
     }
  }

  onTransferrSubmit() {
    this.form.controls['email'].disable();
    this.userEmail = this.form.get("email").value;
    this.router.navigate(['/bookshell',this.userEmail ]);
  }

  refresh() {
    window.location.reload();
  }
}
 

 

