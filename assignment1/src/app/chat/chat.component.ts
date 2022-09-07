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
  channel: {} = {};
  groupNumber:number=0;
  channelNumber:number=0;

  ngOnInit() {
    this.groupNumber = Number(this.route.snapshot.paramMap.get('groupNumber'));
    this.channelNumber = Number(this.route.snapshot.paramMap.get('channelNumber'));
    console.log(this.groupNumber, this.channelNumber);
    this.getChannel(this.groupNumber, this.channelNumber);
  }

  getChannel(groupNumber: number, channelNumber: number) {
    this.httpClient.post<any>(serverURL + '/api/groups', this.groups, httpOptions).subscribe(data => {
      if (data.groups) {
        this.groups = data.groups;
        console.log(this.groups);
        this.channel = this.groups[groupNumber].channel[channelNumber];
        return;
      }
    });
  }

}
