import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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


  constructor(private router: Router, private httpClient: HttpClient) {

  }


  username = JSON.parse(sessionStorage.getItem('username')!);
  email = JSON.parse(sessionStorage.getItem('email')!);
  role = JSON.parse(sessionStorage.getItem('role')!);
  valid = JSON.parse(sessionStorage.getItem('valid')!);
  groups: any[] = [{}];
  
  ngOnInit() {
    this.getGroups()
  }

  getGroups() {
      this.httpClient.post<any>(serverURL + '/api/groups', this.groups, httpOptions).subscribe(data => {
        if (data.groups) {
          this.groups = data.groups;
          console.log(this.groups)
          return;
        }
      });
  }
}
