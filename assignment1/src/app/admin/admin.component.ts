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
  isSelected = false;
 
  selectedUser: string;
  sUsername: string;
  sEmail: string;
  sRole: string;
  
  editDeleteUser: User;

  users: User[];
  

  ngOnInit(): void {
    this.UserService.getUsers().subscribe (res => {
      if (res.users) {
        this.users = res.users;
        console.log(this.users);
      }
    });

  }



  //Retrieve user to be edited or deleted.
  getUser() {
    if (this.selectedUser === "") {
      alert("Please select a user.");
      return;
    } else {
      let user: User;
      for (let i = 0; i < this.users.length; i++) {
        if (this.selectedUser === this.users[i].username) {
          this.isSelected = true;
          this.sUsername = this.users[i].username;
          this.sEmail = this.users[i].email;
          this.sRole = this.users[i].role;
          this.editDeleteUser = {
            username: this.sUsername,
            email: this.sEmail,
            role: this.sRole
          }
          return;
        }
      }
    }
  }


  //Registering a new user
  onNewUser(){
    if(this.username === "" || this.email === "" || this.role === ""){
      alert("Fill in all fields to register a user.");
    } else {
      this.http.post<User>(serverURL + "/onNewUser", {username: this.username, email: this.email, role: this.role})
      .subscribe((data: any) => {
        if (data.registered) {
          alert(this.username + " registered.");
          this.username = "";
          this.email = "";
          this.role = "";

          this.UserService.getUsers().subscribe (res => {
            if (res.users) {
              this.users = res.users;
              console.log(this.users);
            }
          });
        }
      });
    }
  }


  //Edit a current user
  onEdit(){
   return; 
  }


  //Delete a user
  onDelete(){
    if (this.selectedUser === "") {
      alert("Please select a user.")
      return;
    } else {
      this.http.post<User>(serverURL + '/deleteUser', {username: this.selectedUser})
      .subscribe((data: any) => {
        console.log(data)
        if (data.deleted) {
          alert(this.selectedUser + " deleted.");
          this.selectedUser = "";
          this.sEmail = "";
          this.sUsername = "";
          this. sRole = "";
          this.isSelected = false;

          this.UserService.getUsers().subscribe (res => {
            if (res.users) {
              this.users = res.users;
              console.log(this.users);
            }
          });
        }
      })

    }
    return;
  }

}
