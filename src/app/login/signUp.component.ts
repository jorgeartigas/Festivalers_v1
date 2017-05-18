import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../profile/User';

@Component({
  selector: 'signUp',
  templateUrl: 'signUp.component.html',
  styleUrls: [ './signUp.component.css' ]
})
export class SignUpComponent{
  newUser = new User ('','','','',[],'../../assets/no-image-user.png',[],[],[],[],[],[],false,Date.now());

  constructor(private loginService: LoginService){}

  signUp(signUpData){
    this.loginService.signUp(signUpData,this.newUser);
  }
}
