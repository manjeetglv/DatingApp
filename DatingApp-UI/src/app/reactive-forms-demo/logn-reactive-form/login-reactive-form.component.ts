import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login-reactive-form',
  templateUrl: './login-reactive-form.component.html',
  styleUrls: ['./login-reactive-form.component.css']
})
export class LoginReactiveFormComponent implements OnInit {

  constructor() { }

  employeeForm: FormGroup;
  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      fullName: new FormControl(),
      email: new FormControl(),
      // Nested skill form
      skills: new FormGroup({
        skillName: new FormControl(),
        experienceInYears: new FormControl(),
        proficiency: new FormControl()
      })
    });
  }

  onSubmit(): void {
    console.log(this.employeeForm.value);
    console.log(this.employeeForm.controls.fullName.value);
    console.log(this.employeeForm.controls.email.value);
  }

  onLoadClick() {
    this.employeeForm.patchValue({
      fullName: 'manjeet lama',
      email: 'manjeet@webilize.com',
      skills:{
        skillName: 'C#',
        experienceInYears: '2',
        proficiency: 'beginner'
      }
    });
  }


}
