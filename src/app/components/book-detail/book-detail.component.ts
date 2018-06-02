import { Book } from './../../models/book';
import { Customer } from './../../models/customer';
import { BookService } from './../../service/book.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  message;
  messageClass;
  bookId:Number;
  uploadUserId:Number;
  private sub: any;
  books:Book[];
  imagePath;


  constructor(
    private route: ActivatedRoute,
    private bookService:BookService,
    private location:Location,
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params=>{
      this.bookId =+ params['bookId'];
      this.uploadUserId =+ params['uploadUserId'];
      
      this.bookService.getBookDetail(this.bookId, this.uploadUserId).subscribe(data=>{
    
        if(data.success!=undefined) {
          this.message = "Can not find data";
          this.messageClass = "alert alert-danger";
        } else {
          this.books = data;
          this.books.forEach(book=>{
            this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' 
            + book.bookPic);
          })
        }
      });
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onClickBack() {
    this.location.back();
  }

}
