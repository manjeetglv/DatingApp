import { Component, OnInit } from '@angular/core';
import {User} from "../../../_models/User";
import {UserService} from "../../../_services/user.service";
import {AlertifyService} from "../../../_services/alertify.service";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  constructor(private userService: UserService, private alertifyService: AlertifyService) { }

  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers(){
    this.userService.getUsers().subscribe((response: User[]) => {
       this.users = response;
    }, error => {
      this.alertifyService.error(error);
    })
  }
}
