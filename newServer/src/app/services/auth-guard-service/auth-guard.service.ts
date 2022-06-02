import { Injectable } from '@angular/core';

import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';




@Injectable({

  providedIn: 'root'

})

export class AuthGuardService implements CanActivate{

  user:any

  constructor(private authService: AuthService, private router: Router) { }



  canActivate(){
     
    if(this.authService.loggedIn()) {
     this.authService.isloggedin = true
      return true;

    }

    else {
     
     localStorage.clear()
      this.router.navigate(['/login']);
      return false;

    }

  }

}