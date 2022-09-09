import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { Group } from '../model/group';
import { FormControl, FormGroup } from '@angular/forms';

const serverURL = 'http://localhost:3000';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, public UserService: UserService, private http: HttpClient) { }
  adminUsername = JSON.parse(sessionStorage.getItem('username')!);
  adminRole = JSON.parse(sessionStorage.getItem('role')!);
  username: string;
  email: string;
  role: string;
  user: User;
 
  selectedUser: string;
  sUsername: string;
  sEmail: string;
  sRole: string;
  

  users: User[];
  isSuper = false;
  

  ngOnInit(): void {
    this.UserService.getUsers().subscribe (res => {
      if (res.users) {
        this.users = res.users;
        console.log(this.users);
      }
    });

    if (this.adminRole === "super") {
      this.isSuper = true;
    }

  }

  getUsers() {
    this.http.post<any>(serverURL + '/getUsers', this.users)
    .subscribe(res => {
      if (res.users) {
        this.users = res.users;
        console.log(this.users);
        return;
      }
    });
  }

  getUser() {
    if (this.selectedUser === "") {
      alert("Please select a user.");
      return;
    } else {
      let user: User;
      for (let i = 0; i < this.users.length; i++) {
        if (this.selectedUser === this.users[i].username) {
          this.sUsername = this.users[i].username;
          this.sEmail = this.users[i].email;
          this.sRole = this.users[i].role;
          return;
        }
      }
    }
  }

}
