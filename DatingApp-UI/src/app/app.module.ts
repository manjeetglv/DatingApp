import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { ReactiveFormsDemoModule } from './reactive-forms-demo/reactive-forms-demo.module';
import { NavComponent } from './nav/nav.component';
import {FormsModule} from "@angular/forms";
import {AuthService} from "./_services/auth.service";
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import {ErrorInterceptorProvider} from "./_services/error.interceptor";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MemberListComponent } from './components/member-list/member-list.component';
import { ListsComponent } from './components/lists/lists.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      ListsComponent,
      MessagesComponent
   ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsDemoModule,
        FormsModule,
        BsDropdownModule.forRoot(),
        AppRoutingModule
    ],
   providers: [AuthService,
     ErrorInterceptorProvider],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
