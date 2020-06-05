import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-reactive-builder-form',
  templateUrl: './login-reactive-builder-form.component.html',
  styleUrls: ['./login-reactive-builder-form.component.css']
})
export class LoginReactiveBuilderFormComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder) { }

  employeeForm: FormGroup;
  ngOnInit(): void {
    this.employeeForm = this._formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      email: ['', Validators.required],
      skills: this._formBuilder.group({
        skillName: ['', Validators.required],
        experienceInYears: ['', Validators.required],
        proficiency: ['', Validators.required],
        expectedSalary: ['', Validators.required]
      })
    });

    this.employeeForm.valueChanges.subscribe((data) => {
      this.logErrors();
    });
  }

  logErrors(){
    this.logFormValidationErrors(this.employeeForm, this.validationErrorMessagesInventory, this.validationErrorMessages);
  }

  onSubmit(): void {
    console.log(this.employeeForm.value);
    console.log(this.employeeForm.controls.fullName.value);
    console.log(this.employeeForm.controls.email.value);
  }

  onLoadClick() {
    // this.employeeForm.patchValue({
    //   fullName: 'manjeet lama',
    //   email: 'manjeet@webilize.com',
    //   skills:{
    //     skillName: 'C#',
    //     experienceInYears: '2',
    //     proficiency: 'beginner'
    //   }
    // });
    // this.logFormValidationErrors(this.employeeForm, this.validationErrorMessagesInventory, this.validationErrorMessages);
    // console.log(this.validationErrorMessages);
  }


  logFormValidationErrors(formGroup: FormGroup, validationErrorMessagesInventory, validationErrorMessages): void{
    Object.keys(formGroup.controls).forEach((key: string) =>{
      const abstractFormControl = formGroup.get(key);
      if(abstractFormControl instanceof FormGroup){
        this.logFormValidationErrors(abstractFormControl, validationErrorMessagesInventory, validationErrorMessages);
      }else {
        validationErrorMessages[key] = "";
        if(key === "expectedSalary")
          console.log("Key: "+key+ "\t Value: "+abstractFormControl.value)
        if(abstractFormControl && abstractFormControl.invalid && (abstractFormControl.touched || abstractFormControl.dirty)){

          if(!validationErrorMessagesInventory.hasOwnProperty(key)){
            throw "'"+ key +"' form element is missing in "+ Object.keys({validationErrorMessagesInventory})[0];
          }
          const messages = validationErrorMessagesInventory[key];

          for (const errorKey in abstractFormControl.errors){
            if(!messages.hasOwnProperty(errorKey)){
              throw "'"+ errorKey +"' validation message is missing for '"+ key +"' form element in "+ Object.keys({validationErrorMessagesInventory})[0];
            }
            validationErrorMessages[key] += messages[errorKey] + " ";
          }
        }
      }
    });
  }


  validationErrorMessagesInventory = {
    "fullName":{
      "required": "Full Name is required.",
      "minlength": "Full Name must be greater than 2 character.",
      "maxlength": "Full Name must be less than 10 characters."
    },
    "email": {
      "required": "Email is required."
    },
    "skillName": {
      "required": "Skill Name is required."
    },
    "experienceInYears": {
      "required": "Experience is required."
    },
    "proficiency":{
      "required": "Proficiency is required."
    },
    "expectedSalary": {
      "required": "Expected Salary is required"
    }
  };

  validationErrorMessages = {
    "fullName":"",
    "email":"",
    "skillName":"",
    "experienceInYears":"",
    "proficiency":"",
    "expectedSalary":""
  }

}
