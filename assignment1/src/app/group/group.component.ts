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
  newID: number;
  channels: Channel[];
  users: User[];
  addedUser: string = "";
  removedUser: string = "";
  addUsers: string[] = [];
  removeUsers: string[];

  addedAssistant: string = "";
  removedAssistant: string = "";
  addAssistants: string[] = [];
  removeAssistants: string[] = [];

  supers: string[];
  admins: string[];
  assistants: string[];
  nonAssistants: string[];




  ngOnInit(){
    this.getChannels();
    this.getLastChannel();
    this.getAdmins();
    this.removableUsers();
    this.getRoles();
  }

  //Retrireves the channels in the current group for the display.
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

  //Retrieves a list of admins for permission purposes.
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

  //Navigates to the selected channel page.
  openChannel(channelID: number){
    this.router.navigateByUrl('/chat/' + channelID)
  }

  //Retrieves the most recent channel ID, used for setting the ID of a newly created channel.
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


  //Adds a channel to the group.
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

          //Updating list of channels in the group for the display.
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

  //Deletes a channel from the group
  deleteChannel(chanID: number) {
    this.httpClient.post(serverURL + '/deleteChannel', {chanID: chanID, groupID: this.groupID})
    .subscribe((data: any) => {
      if (data.deleted) {
        alert('Channel with ID: ' + data.chanID + ' deleted.')

        //Updating the list of channels in the group.
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

  //Retrieves a list of users that can be removed from the group.
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

  //Retrieves a list of users that can be added to the group.
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

  //Retrieves roles for permission purposes.
  getRoles(){
    this.httpClient.post<any>(serverURL + '/getAssistants', {groupID: this.groupID, role: this.role})
    .subscribe((data: any) => {
      if (data) {
        this.supers = data.supers;
        this.admins = data.admins;
        this.nonAssistants = data.nonAssistants;
        this.assistants = data.assistants;
      }
      console.log("Supers: " + this.supers);
      console.log("Admins: " + this.admins);
      console.log("Users that can be promoted: " + this.nonAssistants);
      console.log("Users you can demote: " + this.assistants);
    });
  }


  //
  removeAdminsFrom(){
    this.UserService.getUsers().subscribe (res => {
      if (res.users){
        for (let user in res.users){
          if(res.users[user].role === 'super' || res.users[user].role === 'admin'){
            let index = this.addAssistants.indexOf(res.users[user].username, 0);
            if (index > -1) {
              this.addAssistants.splice(index, 1);
            }
          }
        }
      }
    });
  }


  //Adds an assistant to the current group.
  addAssistant(){
    if (this.addedAssistant === ""){
      alert("Please select a user to promote.")
      return;
    } else {
      this.httpClient.post<any>(serverURL + '/addGroupAssistant', {user: this.addedAssistant, groupID: this.groupID})
      .subscribe((data: any) => {
        if(data.userPromoted){
          alert(this.addedAssistant + " promoted to group assistant.");
          let index = this.addAssistants.indexOf(this.addedAssistant, 0);
          if (index > -1) {
            this.addAssistants.splice(index, 1);
          }
          this.getRoles();
          this.addedAssistant = "";
          this.removedAssistant = "";
          this.removeAssistants.push(this.addedAssistant);
        }
      });
    }
  }


  //Removes an assistant from the current group
  removeAssistant(){
    if (this.removedAssistant === ""){
      alert("Please select an assistant to demote.");
      return;
    } else {
      this.httpClient.post<any>(serverURL + '/removeGroupAssistant', {user: this.removedAssistant, groupID: this.groupID})
      .subscribe((data: any) => {
        if(data.userDemoted){
          alert(this.removedAssistant + " demoted from assistant.");
          let index = this.removeAssistants.indexOf(this.removedAssistant, 0);
          if(index > -1){
            this.removeAssistants.splice(index, 1);
          }
          this.getRoles();
          this.addAssistants.push(this.addedAssistant);
        }
      });
      this.addedAssistant = "";
      this.removedAssistant = "";
    }
  }


  //Adds a user to the current group
  addUser(){
    if (this.addedUser === ""){
      alert("Please select a user to add.")
      return;
    } else {
      this.httpClient.post<any>(serverURL + '/addGroupUser', {user: this.addedUser, groupID: this.groupID})
      .subscribe((data: any) => {
        if(data.userAdded){
          alert(this.addedUser + " added to the group.");

          //Updating list of users that can be added to the group.
          let index = this.addUsers.indexOf(this.addedUser, 0);
          if (index > -1) {
            this.addUsers.splice(index, 1);
          }
          //Updating list of users that can be removed to the group.
          this.removeUsers.push(this.addedUser);
          console.log("Removable users: ", this.removeUsers);
          console.log("Addable users: ", this.addUsers);
        }
      })
    }
  }


  //Removes a user from the current group
  removeUser(){
    if (this.removedUser === ""){
      alert("Please select user to remove.")
      return;
    } else {
      this.httpClient.post<any>(serverURL + '/removeGroupUser', {user: this.removedUser, groupID: this.groupID})
      .subscribe((data: any) => {
        if(data.userRemoved){
          alert(this.removedUser + " removed from the group.");

          //Updating list of users that can be removed from the group.
          let index = this.removeUsers.indexOf(this.removedUser, 0);
          if (index > -1){
            this.removeUsers.splice(index, 1);
          }
          //Updating list of users that can be added to the group.
          this.addUsers.push(this.removedUser);
          console.log("Removable users: ", this.removeUsers);
          console.log("Addable users: ", this.addUsers);
        }
      })
    }
  }

}
