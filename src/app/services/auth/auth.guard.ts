import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { 
    
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const expectedAdmin = next.data.expectedAdmin;
    const employee = next.data.expectedUser;
    const valid = this.authService.isAuthenticated();
    const user = sessionStorage.getItem('user');
    

    if (valid && (expectedAdmin == user)) {
      return true;
    }
    if (valid && (employee == user)) {
      return true;
    }
    else {
      Swal.fire('Warning', 'Access Denied!', 'error');
      sessionStorage.clear();
      this.authService.logout();
      this.router.navigate(['']);
      return false;
    }
  }
 
}
