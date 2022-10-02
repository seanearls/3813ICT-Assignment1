import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GroupsComponent } from './groups/groups.component';
import { ChatComponent } from './chat/chat.component';
import { AdminComponent } from './admin/admin.component';
import { GroupsService } from './services/groups.service';
import { UserService } from './services/user.service';
import { GroupAdminComponent } from './group-admin/group-admin.component';
import { GroupComponent } from './group/group.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GroupsComponent,
    ChatComponent,
    AdminComponent,
    GroupAdminComponent,
    GroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
