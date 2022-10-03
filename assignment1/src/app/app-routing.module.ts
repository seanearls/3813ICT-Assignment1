import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ChatComponent } from './chat/chat.component';
import { GroupsComponent } from './groups/groups.component';
import { LoginComponent } from './login/login.component';
import { GroupComponent } from './group/group.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'chat/:groupNumber/:channelNumber', component:ChatComponent},
  {path:'groups', component:GroupsComponent},
  {path:'admin', component:AdminComponent},
  {path:'group/:groupID', component:GroupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
