import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


const serverURL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})

export class UserService{
  constructor(private router: Router, private http: HttpClient) { }

  username: string;
  email: string;
  role: string;
  users: User[];
  user: User;


  ///Retrieve users from server
  getUsers() {
    return this.http.post<any>(serverURL + '/getUsers', this.users)
  }

  ///Returning observable of new user
  onNewUser(user: User) {
    return this.http.post<User>(serverURL + '/onNewUser', user);
  }

}
