import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Message } from '../model/message';

const url = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;

  constructor() { }

  initSocket(){
    this.socket = io(url);

    return () => {
      this.socket.disconnect();
    }
  }

  sendMessage(message: Message){
    this.socket.emit('message', message);
  }

  userJoined(username: string){
    this.socket.emit('announcement', username + " has joined the room.");
  }

  userLeft(username: string){
    this.socket.emit('announcement', username + " has left the room.");
  }

  channelDetails(details: any){
    this.socket.emit('channelDetails', details);
  }

  getMessage(){
    return new Observable((observer) => {
      this.socket.on('message', (data: any) => {
        observer.next(data);
      });
    });
  }
}
