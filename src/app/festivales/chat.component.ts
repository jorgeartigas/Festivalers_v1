import { Component, OnInit} from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { CurrentUserData } from '../services/user-data.service';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  allMessages: FirebaseListObservable<any>;
  msgReset:string;
  error: boolean = false;

  constructor(
    public af: AngularFire,
    public userData : CurrentUserData
    ) {}
  ngOnInit(){
    this.allMessages = this.af.database.list('FESTIVALERS/messages', {
      query: {
        limitToLast: 5
      }
    });
  }
  sendMsg(msg: string) {
    if(!msg || msg == " "){
        this.error = true;
    }else{
        this.af.database.list('FESTIVALERS/messages/').push({message: msg,name: this.userData.currentUser.name,uid:this.userData.userUID});
        this.msgReset = " ";
    }
  }

}