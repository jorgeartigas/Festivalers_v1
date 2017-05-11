import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent{
  results: FirebaseListObservable<any[]>;
  showResults: boolean;

constructor(private userService: UserService, private af: AngularFire){
    this.results = this.af.database.list('FESTIVALERS/festivales');

}
login(loginData) {
  this.userService.login(loginData);
}
showResultsFunction(){
  this.showResults = true;
}
filter(results,estilo) : boolean{
     if (results.estilo !== estilo){
        return true;
     }
     return false;
  }
}
