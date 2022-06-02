import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user-model/user.model';
import { UserService } from '../../services/user-service/user.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Login } from  '../../models/login-model/login.model';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,public flashMessagesService:  FlashMessagesService) { 
    if(this.authService.loggedIn()){
      this.authService.isloggedin=true
      this.router.navigate(['ticket'])

    }
      
      {this.authService.isloggedin}
  }

    loginData = new Login("","");

  ngOnInit(): void {
  }

  onLoginSubmit() {
    const loginData = new Login(this.loginData.email, this.loginData.password);
    
    this.authService.authenticateUser(loginData).subscribe(res => {

      if(res.result) {
        this.authService.storeUserData(res.token, res.result);
        this.authService.isloggedin = true
        this.authService.user = res.result
        // this.flashMessagesService.show('You are now logged in.', { cssClass: 'alert-success', timeout: 2500});
        this.router.navigate(['ticket']);
      
     
        
      }
      if(res.message) {
        console.log('first')
        this.flashMessagesService.show(res.message, { cssClass: 'alert-danger', timeout: 4500});
        this.router.navigate(['login']);
      }
    
    });
  }
}
