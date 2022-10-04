import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../model/group';
import { Channel } from '../model/channel';
import { GroupsService } from '../services/groups.service';
import { UserService } from '../services/user.service';
import { User } from '../model/user';

const serverURL = 'http://localhost:3000';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private httpClient: HttpClient, public GroupService: GroupsService, public UserService: UserService) { }

  username = JSON.parse(sessionStorage.getItem('username')!);
  email = JSON.parse(sessionStorage.getItem('email')!);
  role = JSON.parse(sessionStorage.getItem('role')!);
  valid = JSON.parse(sessionStorage.getItem('valid')!);
  groupID: number=Number(this.route.snapshot.paramMap.get('groupID'))
  channelName: string = "";
  admins: string[];
  newID: number;
  channels: Channel[];
  users: User[];
  addedUser: string = "";
  removedUser: string = "";
  addUsers: string[] = [];
  removeUsers: string[];


  ngOnInit(){
    this.getChannels();
    this.getLastChannel();
    this.getAdmins();
    this.removableUsers();
  }

  getChannels(){
    let validChannels: Channel[] = [];
    this.httpClient.post<any>(serverURL + '/getChannels', this.channels)
    .subscribe(res => {
      if (res.channels) {
        for (let channel in res.channels) {
          if (this.groupID === res.channels[channel].groupID){
            for (let user in res.channels[channel].users){
              if (this.username === res.channels[channel].users[user]) {
                validChannels.push(res.channels[channel]);
              }
            }
          }
        }
        this.channels = validChannels;
      }
    })
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

  openChannel(channelID: number){
    this.router.navigateByUrl('/chat/' + channelID)
  }

  getLastChannel(){
    let checker = [];
    this.httpClient.post<any>(serverURL + '/getChannels', this.channels).subscribe (res => {
      if (res.channels) {
        for (let channel in res.channels) {
          if (res.channels[channel].groupID === this.groupID){
            checker.push(res.channels[channel])
          }
        }
        this.newID = checker.length + 1;
      }
    })
  }

  addChannel() {
    if (this.channelName === "") {
      alert("Please enter a channel name.")
      return;
    } else {
      this.httpClient.post<Channel>(serverURL + '/newChannel', {groupID: this.groupID, newID: this.newID, cName: this.channelName, users: this.admins})
      .subscribe((data: any) => {
        if(data.existing){
          alert('Channel name "' + this.channelName + '" already exists in this group.');
          this.channelName = "";
          return;
        }
        if(data.channelMade) {
          this.channelName = "";
          this.newID += 1;

          this.httpClient.post<any>(serverURL + '/getChannels', this.channels).subscribe(res => {
            if (res.channels) {
              let validChannels = []
              for (let channel in res.channels){
                if (res.channels[channel].groupID === this.groupID){
                  validChannels.push(res.channels[channel]);
                }
              }
              this.channels = validChannels;
            }
          });
        }
      });
    }
  }

  deleteChannel(chanID: number) {
    this.httpClient.post(serverURL + '/deleteChannel', {chanID: chanID, groupID: this.groupID})
    .subscribe((data: any) => {
      if (data.deleted) {
        alert('Channel with ID: ' + data.chanID + ' deleted.')

        this.httpClient.post<any>(serverURL + '/getChannels', this.channels).subscribe(res => {
          if (res.channels) {
            let validChannels = []
            for (let channel in res.channels){
              if (res.channels[channel].groupID === this.groupID){
                validChannels.push(res.channels[channel]);
              }
            }
            this.channels = validChannels;
          }
        });
      }
    })
  }

  removableUsers(){
    this.GroupService.getGroups().subscribe (res => {
      if (res.groups) {
        for (let group in res.groups) {
          if (res.groups[group].ID === this.groupID) {
            this.removeUsers = res.groups[group].users
            console.log("Removable users: ", this.removeUsers);
          }
        }
        this.addableUsers();
      }
    });
  }

  addableUsers(){
    this.UserService.getUsers().subscribe (res => {
      if(res.users){
        for (let user in res.users) {
          if(!(this.removeUsers.includes(res.users[user].username))) {
            this.addUsers.push(res.users[user].username)
          }
        }
        console.log("Addable users: ", this.addUsers);
      }
    });
  }

  addUser(){
    if (this.addedUser === ""){
      alert("Please select a userto add.")
      return;
    } else {
      this.httpClient.post<any>(serverURL + '/addGroupUser', {user: this.addedUser, groupID: this.groupID})
      .subscribe((data: any) => {
        if(data.userAdded){
          alert(this.addedUser + " added to the group.");
          let index = this.addUsers.indexOf(this.addedUser, 0);
          if (index > -1) {
            this.addUsers.splice(index, 1);
          }
          this.removeUsers.push(this.addedUser);
          console.log("Removable users: ", this.removeUsers);
          console.log("Addable users: ", this.addUsers);
        }
      })
    }
  }

  removeUser(){
    if (this.removedUser === ""){
      alert("Please select user to remove.")
      return;
    } else {
      this.httpClient.post<any>(serverURL + '/removeGroupUser', {user: this.removedUser, groupID: this.groupID})
      .subscribe((data: any) => {
        if(data.userRemoved){
          alert(this.removedUser + " removed from the group.");
          let index = this.removeUsers.indexOf(this.removedUser, 0);
          if (index > -1){
            this.removeUsers.splice(index, 1);
          }
          this.addUsers.push(this.removedUser);
          console.log("Removable users: ", this.removeUsers);
          console.log("Addable users: ", this.addUsers);
        }
      })
    }
  }

}
