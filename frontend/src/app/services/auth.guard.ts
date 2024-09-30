import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userservice:UserService , private router:Router){}
  canActivate(){
    if(this.userservice.isloggedin()){
      return true;
    }else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
