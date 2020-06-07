import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  msg;
  commingMsg = [];
  constructor(private socket:SocketService){
    this.socket.msgObserver.subscribe(msg=>{
      console.log("in app component msg=",msg);
    })
    this.socket.getMsg$.subscribe(msg=>{
      console.log("in app componet getmsg msg=>",msg);
      this.commingMsg.push(msg);
    })
  }

  ngOnInit(): void {
    this.socket.setupSocketConnection();
  }
  sendMsg(){
    this.socket.sendMessage(this.msg);
    this.msg = "";
  }
}
