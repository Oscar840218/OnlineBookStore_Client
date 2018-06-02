import { Injectable }       from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CustomerService } from '../service/customer.service';

@Injectable()
export class NotAuthGuard implements CanActivate {

  constructor(
    private authService: CustomerService,
    private router: Router
  ) {}  

  canActivate() {
    if (this.authService.loggedIn()) {
        this.router.navigate(['/']);
        return false;
    } else {
        return true;
    }
  }
}
