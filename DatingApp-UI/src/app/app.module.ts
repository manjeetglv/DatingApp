import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {JwtModule} from "@auth0/angular-jwt";

import {ErrorInterceptorProvider} from "./_services/error.interceptor";

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { ReactiveFormsDemoModule } from './reactive-forms-demo/reactive-forms-demo.module';
import { NavComponent } from './components/nav/nav.component';
import {FormsModule} from "@angular/forms";
import {AuthService} from "./_services/auth.service";
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { ListsComponent } from './components/lists/lists.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { MemberCardComponent } from './components/members/member-card/member-card.component';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import {TabsModule} from "ngx-bootstrap/tabs";
import {NgxGalleryModule} from "ngx-gallery-9";
import { MemberEditComponent } from './components/members/member-edit/member-edit.component';


export function tokenGetter() {
return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      ListsComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsDemoModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    AppRoutingModule,
    NgxGalleryModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['http://localhost:5000/api/auth',
          'http://localhost:5000/api/auth/register']
      }
    }),
    TabsModule.forRoot()
  ],
   providers: [AuthService,
     ErrorInterceptorProvider],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
