import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../profile/User';

@Component({
  selector: 'signUp',
  templateUrl: 'signUp.component.html',
  styleUrls: [ './signUp.component.css' ]
})
export class SignUpComponent{
  newUser = new User ('','','','',[],'',[],[],[],[],[],[],false,Date.now());

  constructor(private userService: UserService){}

  signUp(signUpData){
    this.userService.signUp(signUpData,this.newUser);
  }
}
