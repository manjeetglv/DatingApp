import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/'
  private jwtHelperService: JwtHelperService = new JwtHelperService();
  constructor(private http: HttpClient) { }

  login(creds: any){
    return this.http.post(this.baseUrl+'login', creds, {headers: new HttpHeaders({accept: "text/html"})})
      .pipe(map((response: any) =>  {
        const user = response;
        if(user){
          localStorage.setItem('token', user.token);
        }
      }));
  }

  decodeToken(): any {
    const userToken = localStorage.getItem('token');
    return this.jwtHelperService.decodeToken(userToken);
  }

  register(creds: any){
  return this.http.post(this.baseUrl+'register', creds);
  }

  isLoggedIn(){
    const token = localStorage.getItem('token');
    return !this.jwtHelperService.isTokenExpired(token);
  }
}
