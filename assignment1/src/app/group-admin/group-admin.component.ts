import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../model/group';
import { Channel } from '../model/channel';
import { GroupsService } from '../services/groups.service';
import { UserService } from '../services/user.service';

const serverURL = 'http://localhost:3000';

@Component({
  selector: 'app-group-admin',
  templateUrl: './group-admin.component.html',
  styleUrls: ['./group-admin.component.css']
})
export class GroupAdminComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private httpClient: HttpClient, public GroupService: GroupsService, public UserService: UserService) { }

  username = JSON.parse(sessionStorage.getItem('username')!);
  email = JSON.parse(sessionStorage.getItem('email')!);
  role = JSON.parse(sessionStorage.getItem('role')!);
  valid = JSON.parse(sessionStorage.getItem('valid')!);
  group: Group;
  groups: Group[];
  channelName: string = "";
  groupNumber:number=Number(this.route.snapshot.paramMap.get('groupNumber'));
  admins: string[];
  newId: number;

  ngOnInit(){
    this.getGroup(this.groupNumber);
    this.getAdmins();
  }

  getGroup(groupNumber: number) {
    this.GroupService.getGroups()
    .subscribe(res => {
      if (res.groups) {
        this.groups = res.groups;
        this.group = this.groups[groupNumber-1];
        console.log(this.group.channel.length);
        this.newId = this.group.channel.length + 1;
        return;
      }
    });
  }

  deleteGroup(group: string) {
    this.httpClient.post(serverURL + '/deleteGroup', {gName: group})
    .subscribe((data: any) => {
      if (data.deleted) {
        alert(group + ' deleted.')
        group = '';
        this.router.navigateByUrl('/groups');
      }
    })
  }

  addChannel () {
    if (this.channelName === "") {
      alert("Please enter a channel name.")
      return;
    } else {
      this.httpClient.post<Channel>(serverURL + '/newChannel', {groupName: this.group.gName, newId: this.newId, cName: this.channelName, messages: [{}], users: this.admins})
      .subscribe((data: any) => {
        if(data.channelMade) {
          this.channelName = "";

          this.getGroup(this.groupNumber);
        }
      })
    }
  }

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

  deleteChannel (channel: string) {

  }

  addUser (user: string) {

  }

  removeUser (user: string) {

  }

  addAssistant (user: string) {

  }

}
