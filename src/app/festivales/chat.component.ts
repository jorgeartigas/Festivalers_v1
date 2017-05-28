import { Component, OnInit} from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { CurrentUserData } from '../services/user-data.service';
import { ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  idFestival:string;
  allMessages: FirebaseListObservable<any>;
  msgReset:string;
  error: boolean = false;

  constructor(
    public af: AngularFire,
    public userData : CurrentUserData,
    public route: ActivatedRoute
    ) {}
  ngOnInit(){
    this.route.params.first().subscribe(params => {
        this.idFestival = params['id'];
        this.allMessages = this.af.database.list('FESTIVALERS/messages/'+this.idFestival, {
          query: {
            limitToLast: 5
          }
        });
    });
  }
  sendMsg(msg: string) {
    if(!msg || msg == " "){
        this.error = true;
    }else{
        this.af.database.list('FESTIVALERS/messages/'+this.idFestival).push({message: msg,name: this.userData.currentUser.name,uid:this.userData.userUID,time:Date.now()});
        this.msgReset = " ";
    }
  }

}