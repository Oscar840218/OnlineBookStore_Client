import { UpdateBookComponent } from './components/update-book/update-book.component';
import { NotAuthGuard } from './guards/notauth.guard';
import { AuthGuard } from './guards/auth.guard';
import { BookshellComponent } from './components/bookshell/bookshell.component';
import { IndexComponent } from './components/index/index.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterBookComponent } from './components/register-book/register-book.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';

const routes: Routes = [
  {
    path:"", 
    component: IndexComponent
  },
  {
    path:"bookshell",
    component: BookshellComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"bookshell/:email",
    component: BookshellComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path:"book-detail/:bookId/:uploadUserId",
    component: BookDetailComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path:"profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"register-book",
    component: RegisterBookComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"update-book",
    component: UpdateBookComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"register-user",
    component: RegisterUserComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path:"login",
    component: LoginComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path:"**",
    component: IndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
