import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

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

  sendMessage(message: string){
    this.socket.emit('message', message);
  }

  getMessage(){
    return new Observable((observer) => {
      this.socket.on('message', (data: any) => {
        observer.next(data);
      });
    });
  }
}
