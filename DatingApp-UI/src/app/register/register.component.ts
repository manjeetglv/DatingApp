import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from "../_services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }
  @Output() cancelRegister = new EventEmitter();
  creds: any = {};

  register(){
    console.log(this.creds);
    this.authService.register(this.creds).subscribe(()=>{
      console.log('Registration Successful');
    }, error => {
      console.log(error);
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log('Canceled');
  }
  ngOnInit(): void {
  }

}
