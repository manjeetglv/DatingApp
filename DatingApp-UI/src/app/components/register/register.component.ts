import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import {AlertifyService} from "../../_services/alertify.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private alertifyService: AlertifyService) { }
  @Output() cancelRegister = new EventEmitter();
  creds: any = {};

  register(){
    console.log(this.creds);
    this.authService.register(this.creds).subscribe(()=>{
      this.alertifyService.success('Registration  Successful');
    }, error => {
      this.alertifyService.error(error);
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log('Canceled');
  }
  ngOnInit(): void {
  }

}
