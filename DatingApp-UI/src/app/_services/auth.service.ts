import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseUrl = 'http://localhost:5000/api/auth/'
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

  register(creds: any){
  return this.http.post(this.baseUrl+'register', creds);
  }
}