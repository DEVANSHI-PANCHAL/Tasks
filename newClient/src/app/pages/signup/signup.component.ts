import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user-model/user.model';
import { UserService } from '../../services/user-service/user.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth-service/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  model = new User("", "", "","");

  constructor(private userService: UserService,
    private authService: AuthService,
    private router: Router,
    public flashMessagesService:  FlashMessagesService) { if(this.authService.loggedIn()){
      this.authService.isloggedin=true
      this.router.navigate(['ticket'])

    }}
   
  ngOnInit(): void {
  }

      onRegisterSubmit() {
        this.userService
        .registerUser(this.model)
        .subscribe(res => {
          if(res.result) {
  
            // this.flashMessagesService.show("User registered successfully", { cssClass: 'alert-success', timeout: 5500});
            this.router.navigate(['/login']);
          }
          if(res.message) {
       
            this.flashMessagesService.show(res.message, { cssClass: 'alert-danger', timeout: 4500});
            this.router.navigate(['/register']);
          }
        });
      }
  

}
