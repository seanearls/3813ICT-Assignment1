import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const serverURL = 'http://localhost:3000';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private httpClient: HttpClient) { }

  username = JSON.parse(sessionStorage.getItem('username')!);
  email = JSON.parse(sessionStorage.getItem('email')!);
  role = JSON.parse(sessionStorage.getItem('role')!);
  valid = JSON.parse(sessionStorage.getItem('valid')!);
  groups: any[] = [{}];
  groupNumber:number=Number(this.route.snapshot.paramMap.get('groupNumber'));
  channelNumber:number=Number(this.route.snapshot.paramMap.get('channelNumber'));
  channel:any;
  

  ngOnInit() {
    this.getChannel(this.groupNumber, this.channelNumber);
    console.log(this.channel);
    this.getGroups();
  }

  getGroups() {
    this.httpClient.post<any>(serverURL + '/getGroups', this.groups, httpOptions).subscribe(data => {
      if (data.groups) {
        this.groups = data.groups;
        console.log(this.groups);
        let group = this.groups[this.groupNumber];
        return group;
      }
    });
}

  getChannel(groupNumber: number, channelNumber: number) {
    this.httpClient.post<any>(serverURL + '/getGroups', this.groups, httpOptions).subscribe(data => {
      if (data.groups) {
        this.groups = data.groups;
        this.channel = this.groups[groupNumber-1].channel[channelNumber-1];
        let channel = this.channel;
        console.log(channel);
        console.log(this.channel);
        return;
      }
    });
  }

  addUser() {

  }

}
