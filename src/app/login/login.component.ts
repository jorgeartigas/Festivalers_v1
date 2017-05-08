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
login(username,password) {
  this.userService.login(username,password);
}
showResultsFunction(){
  this.showResults = true;
}
filter(results,estilo,mes) : boolean{
     if (results.estilo === estilo && results.mes){
        return true;
     }
     return false;
  }
}
