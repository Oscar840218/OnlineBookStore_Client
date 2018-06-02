import { CustomerService } from './../service/customer.service';
import { Injectable }       from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    redirectUrl;

    constructor(
        private customerService:CustomerService ,
        private router: Router
    ) {}  

    canActivate(
        router: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        if (this.customerService.loggedIn()) {
            return true;
        } else {
            this.redirectUrl = state.url;
            this.router.navigate(['/login']);
            return false;
        }
    }
}
