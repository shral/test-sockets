import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  msg;
  filter = {
    chekbox1:false,
    chekbox2:false,
    input:""
  };
  commingMsg = [];
  constructor(private socket:SocketService){
    this.socket.msgObserver.subscribe(msg=>{
      console.log("in app component msg=",msg);
    })
    this.socket.getMsg$.subscribe(msg=>{
      const newMsg = JSON.parse(msg);
      console.log("in app componet getmsg msg=>",newMsg);
      if(newMsg.msg && newMsg.msg != "" && (this.commingMsg.length === 0 || this.commingMsg[this.commingMsg.length-1] != newMsg.msg))
      this.commingMsg.push(newMsg.msg);
      this.filter = newMsg.filter;
    })
  }

  ngOnInit(): void {
    this.socket.setupSocketConnection();
  }
  sendMsg(){
    this.socket.sendMessage(JSON.stringify({msg:this.msg,filter:this.filter}));
    this.msg = "";
  }

  filterChanged(){
    this.socket.sendMessage(JSON.stringify({msg:this.msg,filter:this.filter}));
  }
}
