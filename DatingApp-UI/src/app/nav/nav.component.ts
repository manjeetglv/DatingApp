import { Component, OnInit } from '@angular/core';
import {AuthService} from "../_services/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(private authService: AuthService) { }

  creds: any = {};

  login(){
    this.authService.login(this.creds).subscribe(success =>{
      console.log('Logged in successfully');
    }, failure =>{
      console.log(failure);
    })
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout(){
    localStorage.removeItem('token');
    console.log("logged out");
  }
  ngOnInit(): void {
  }
}
