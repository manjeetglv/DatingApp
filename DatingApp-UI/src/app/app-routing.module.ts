import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {MemberListComponent} from "./components/members/member-list/member-list.component";
import {MessagesComponent} from "./components/messages/messages.component";
import {ListsComponent} from "./components/lists/lists.component";
import {AuthGuard} from "./_guards/auth.guard";
import {MemberDetailComponent} from "./components/members/member-detail/member-detail.component";
import {MemberDetailResolver} from "./_resolvers/member-detail.resolver";
import {MemberEditComponent} from "./components/members/member-edit/member-edit.component";
import {PreventMembereditUnsavedChangesGuard} from "./_guards/prevent-memberedit-unsaved-changes.guard";

const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {path: '', component: HomeComponent},
      {path: 'members', component: MemberListComponent},
      {path: 'members/edit', component: MemberEditComponent, canDeactivate: [PreventMembereditUnsavedChangesGuard]},
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
