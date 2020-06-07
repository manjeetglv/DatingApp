import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {MemberListComponent} from "./components/member-list/member-list.component";
import {MessagesComponent} from "./components/messages/messages.component";
import {ListsComponent} from "./components/lists/lists.component";
import {AuthGuard} from "./_gaurds/auth.guard";

const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {path: '', component: HomeComponent},
      {path: 'members', component: MemberListComponent},
      {path: 'messages', component: MessagesComponent},
      {path: 'lists', component: ListsComponent},
    ]
  },
  // {path: 'members', component: MemberListComponent, canActivate: [AuthGuard]},
  // {path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},
  // {path: 'lists', component: ListsComponent, canActivate: [AuthGuard]},

  {path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
