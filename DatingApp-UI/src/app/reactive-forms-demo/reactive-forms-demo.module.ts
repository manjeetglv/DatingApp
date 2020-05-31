import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginReactiveFormComponent } from './logn-reactive-form/login-reactive-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SliderModule} from "primeng/slider";
import {LoginReactiveBuilderFormComponent} from "./login-reactive-builder-form/login-reactive-builder-form.component";



@NgModule({
  declarations: [LoginReactiveFormComponent, LoginReactiveBuilderFormComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SliderModule
  ],
  exports: [
    LoginReactiveFormComponent,
    LoginReactiveBuilderFormComponent
  ]
})
export class ReactiveFormsDemoModule { }
