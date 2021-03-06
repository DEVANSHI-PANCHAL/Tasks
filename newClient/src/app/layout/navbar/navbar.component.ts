import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService:AuthService,public router:Router) { }

  ngOnInit(): void {
    this.authService.loggedIn()
  }
  onLogout(){
    this.authService.logout();
    this.authService.isloggedin=false;
    this.router.navigate(['login'])
  }

}
