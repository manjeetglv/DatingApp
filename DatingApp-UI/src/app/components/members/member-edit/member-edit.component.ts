import {Component, HostListener, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../../_services/user.service";
import {AlertifyService} from "../../../_services/alertify.service";
import {User} from "../../../_models/User";
import {AuthService} from "../../../_services/auth.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any){
    if(this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(private authService: AuthService, private userService: UserService, private alertifyService: AlertifyService) { }

  ngOnInit(): void {
    this.userService.getUser(this.authService.decodeToken().nameid).subscribe((user: User) => {
      this.user = user;
    }, error => {
      this.alertifyService.error(error);
    });
  }

  updateUser() {
    this.userService.updateUsers(this.authService.decodeToken().nameid, this.user).subscribe(res => {
      this.editForm.reset(this.user);
      this.alertifyService.success('Profile updated successfully!');
    }, error => {
      this.alertifyService.error(error);
    })
  }
}
