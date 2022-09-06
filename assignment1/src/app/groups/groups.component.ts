import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const serverURL = 'http://localhost:3000';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {


  constructor(private router: Router, private httpClient: HttpClient) { }

  username = JSON.parse(sessionStorage.getItem('username')!);
  email = JSON.parse(sessionStorage.getItem('email')!);
  role = JSON.parse(sessionStorage.getItem('role')!);
  valid = JSON.parse(sessionStorage.getItem('valid')!);

  ngOnInit() {
    if (!sessionStorage.getItem('valid')) {
      alert("You are not logged in.")
      this.router.navigateByUrl('home')
    }
    let messages = {user: "", message: ""};
    let channels = {cName: "", messages: [messages]};
    let groups = [{gName: "", channel:[channels]}];
    this.httpClient.post(serverURL + '/api/groups', groups, httpOptions)


  }

}
