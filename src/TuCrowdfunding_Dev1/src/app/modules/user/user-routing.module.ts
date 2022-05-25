import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from '../chat/chat.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path:'profile',component:ProfileComponent},
  {path:'chats',component:ChatComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
