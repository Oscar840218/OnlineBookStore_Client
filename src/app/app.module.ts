import { NotAuthGuard } from './guards/notauth.guard';
import { AuthGuard } from './guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ImageUploadModule } from "angular2-image-upload";

import { AppComponent } from './app.component';
import { CustomerService } from './service/customer.service';
import { BookService } from './service/book.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { IndexComponent } from './components/index/index.component';
import { BookshellComponent } from './components/bookshell/bookshell.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterBookComponent } from './components/register-book/register-book.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { UpdateBookComponent } from './components/update-book/update-book.component';




@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    BookshellComponent,
    NavbarComponent,
    ProfileComponent,
    RegisterUserComponent,
    LoginComponent,
    RegisterBookComponent,
    BookDetailComponent,
    CarouselComponent,
    UpdateBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule,
    FlashMessagesModule,
    ImageUploadModule.forRoot()
  ],
  providers: [CustomerService, BookService, FlashMessagesService, AuthGuard, NotAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
