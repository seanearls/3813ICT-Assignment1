import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../model/group';
import { GroupsService } from '../services/groups.service';

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


  constructor(private router: Router, private httpClient: HttpClient, public GroupService: GroupsService) {

  }


  username = JSON.parse(sessionStorage.getItem('username')!);
  email = JSON.parse(sessionStorage.getItem('email')!);
  role = JSON.parse(sessionStorage.getItem('role')!);
  valid = JSON.parse(sessionStorage.getItem('valid')!);
  groups: Group[];
  
  ngOnInit() {
    this.getGroups()
  }

  getGroups() {
    this.GroupService.getGroups()
    .subscribe(res => {
      if (res.groups) {
        this.groups = res.groups;
        console.log(this.groups)
      }
    });
  }

  openChannel(groupNumber:number, channelNumber:number) {
    this.router.navigateByUrl('/chat/' + groupNumber + '/' + channelNumber);
  }

}
