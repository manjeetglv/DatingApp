import { Component, OnInit } from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {AlertifyService} from "../_services/alertify.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(private authService: AuthService, private alertifyService: AlertifyService) { }

  creds: any = {};

  login(){
    this.authService.login(this.creds).subscribe(success =>{
      this.alertifyService.success('Logged in successfully');
    }, failure =>{
      this.alertifyService.error(failure);
    })
  }

  getUserName(){
    return this.authService.decodeToken().unique_name;
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  logout(){
    localStorage.removeItem('token');
    this.alertifyService.message("logged out");
  }
  ngOnInit(): void {
  }
}
