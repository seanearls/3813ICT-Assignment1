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

  //Initialising socket connection.
  initSocket(){
    this.socket = io(url);

    return () => {
      this.socket.disconnect();
    }
  }

  //Used for emitting a message sent by a user.
  sendMessage(message: Message){
    this.socket.emit('message', message);
  }

  //Announces when a user has joined a room.
  userJoined(username: string){
    this.socket.emit('announcement', username + " has joined the room.");
  }

  //Announces when a user has left a room.
  userLeft(username: string){
    this.socket.emit('announcement', username + " has left the room.");
  }

  //Sends channel details to the server to segregate rooms.
  channelDetails(details: any){
    this.socket.emit('channelDetails', details);
  }

  //Subscribes to a message so users can see.
  getMessage(){
    return new Observable((observer) => {
      this.socket.on('message', (data: any) => {
        observer.next(data);
      });
    });
  }
}
