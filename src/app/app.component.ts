import { Component, OnInit} from '@angular/core';
import { AngularFire } from 'angularfire2';
import { CurrentUserData } from './services/user-data.service';
import 'rxjs/add/operator/first';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   constructor(
    public af: AngularFire,
    public userData: CurrentUserData
  ){
  //   this.af.auth.first().subscribe(auth=>{
  //   if(auth){
  //     this.af.database.object('FESTIVALERS/Users/'+auth.uid).first().subscribe(user =>{
  //       this.userData.userUID = auth.uid;
  //       this.userData.isLoggedIn = true;
  //       this.userData.currentUser = user;
  //     });
  //   }else{
  //     this.userData.isLoggedIn = false;
  //   }
  // });
}
}

