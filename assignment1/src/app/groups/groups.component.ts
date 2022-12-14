import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../model/group';
import { Channel } from '../model/channel';
import { GroupsService } from '../services/groups.service';
import { UserService } from '../services/user.service';

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


  constructor(private router: Router, private httpClient: HttpClient, public GroupService: GroupsService, public UserService: UserService) {

  }


  username = JSON.parse(sessionStorage.getItem('username')!);
  email = JSON.parse(sessionStorage.getItem('email')!);
  role = JSON.parse(sessionStorage.getItem('role')!);
  valid = JSON.parse(sessionStorage.getItem('valid')!);
  groups: Group[];
  groupName: string = "";
  channelName: string;
  admins: string[];
  newID: number;

  ngOnInit() {
    this.getLastGroup();
    this.getGroups();
    this.getAdmins();
  }


  //Retrieves groups that user is in
  getGroups() {
    let validGroups: Group[] = [];
    this.GroupService.getGroups()
    .subscribe(res => {
      if (res.groups) {
        for (let group in res.groups) {
          for (let user in res.groups[group].users) {
            if (this.username === res.groups[group].users[user]) {
              validGroups.push(res.groups[group]);
            }
          }
        }
        //Removes groups from the display that the logged in user is not in.
        for (let group in validGroups) {
          for (let channel in validGroups[group].channel) {
             if (!validGroups[group].channel[channel].users.includes(this.username)) {
              validGroups[group].channel.pop()
             }
          }
        }

        this.groups = validGroups;
      }
    });
  }


  //Retrieving admin list used for subscribing these users to newly created groups.
  getAdmins(){
    let adminList: string[] = [];
    this.UserService.getUsers().subscribe (res => {
      if (res.users) {
        for (let user in res.users) {
          if (res.users[user].role === 'super' || res.users[user].role === 'admin') {
            adminList.push(res.users[user].username);
          }
        }
        this.admins = adminList
        console.log("Admins: " + this.admins);
      }
    })
  }

  //Navigates to the selected group page
  openGroup(groupID: number) {
    this.router.navigateByUrl('/group/' + groupID)
  }


  //Retrieves the ID of the most recent group. Used for defining new ID for a new group.
  getLastGroup(){
    this.GroupService.getGroups().subscribe (res => {
      if (res.groups) {
        this.newID = res.groups.length + 1;
      }
    })
  }


  //Adds a new group
  addGroup() {
    if(this.groupName === "") {
      alert("Please enter a group name.")
      return;
    } else {
      this.httpClient.post<Group>(serverURL + '/newGroup', {newID: this.newID, gName: this.groupName, users: this.admins, assistants: this.admins})
      .subscribe((data: any) => {
        if(data.existing){
          alert('Group name "' + this.groupName + '" is already taken.')
          this.groupName = "";
          return;
        }
        if(data.groupMade) {
          this.groupName = "";
          this.newID += 1;

          //Getting groups to display updated group list.
          this.GroupService.getGroups().subscribe(res => {
            if (res.groups) {
              this.groups = res.groups;
            }
          });
        }
      });
    }
  }


  //Deletes a group
  deleteGroup(ID: number) {
    this.httpClient.post(serverURL + '/deleteGroup', {ID: ID})
    .subscribe((data: any) => {
      if (data.deleted) {
        alert('Group with ID: ' + data.ID + ' deleted.')

        //Getting groups to display updated group list.
        this.GroupService.getGroups().subscribe(res => {
          if (res.groups) {
            this.groups = res.groups;
          }
        });
      }
    })
  }
}
