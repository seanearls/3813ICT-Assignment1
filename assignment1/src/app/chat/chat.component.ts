import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../model/message';
import { SocketService } from '../services/socket.service';

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

  constructor(private route: ActivatedRoute, private router: Router, private httpClient: HttpClient, private socketService: SocketService) { }

  username = JSON.parse(sessionStorage.getItem('username')!);
  email = JSON.parse(sessionStorage.getItem('email')!);
  role = JSON.parse(sessionStorage.getItem('role')!);
  valid = JSON.parse(sessionStorage.getItem('valid')!);
  groups: any[] = [{}];
  groupNumber:number=Number(this.route.snapshot.paramMap.get('groupNumber'));
  channelNumber:number=Number(this.route.snapshot.paramMap.get('channelNumber'));
  channel:any;
  //messages: Message[];
  messages: string[] = [];
  message: string="";
  ioConnection:any;
  

  ngOnInit() {
    this.initToConnection();
  }

  initToConnection(){
    this.socketService.initSocket();
    this.ioConnection = this.socketService.getMessage()
    .subscribe((message: any) => {
      this.messages.push(message);
    });
  }


  sendMessage(){
    if(this.message){
      this.socketService.sendMessage(this.message);
      this.message = "";
    } else {
      console.log("No message.")
    }
  }

}
