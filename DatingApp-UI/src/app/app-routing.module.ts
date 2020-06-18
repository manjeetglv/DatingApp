import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {MemberListComponent} from "./components/members/member-list/member-list.component";
import {MessagesComponent} from "./components/messages/messages.component";
import {ListsComponent} from "./components/lists/lists.component";
import {AuthGuard} from "./_gaurds/auth.guard";
import {MemberDetailComponent} from "./components/members/member-detail/member-detail.component";
import {MemberDetailResolver} from "./_resolvers/member-detail.resolver";

const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {path: '', component: HomeComponent},
      {path: 'members', component: MemberListComponent},
      {path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
      {path: 'messages', component: MessagesComponent},
      {path: 'lists', component: ListsComponent},
    ]
  },
  {path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
