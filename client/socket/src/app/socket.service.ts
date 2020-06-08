import { Injectable, Output, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket;
  private getMsg = new Subject<string>();
  getMsg$ = this.getMsg.asObservable();
  msgObserver = new Observable();
  constructor() { }
  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    console.log("connected...")
    this.socket.on('msg', (data) => {
      this.getMsg.next(data);
    });
  }
  sendMessage(msg){
    this.socket.emit("msg",msg);
  }

}
