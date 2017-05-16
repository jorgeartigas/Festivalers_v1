import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent{


constructor(public userService: UserService){}
  login(loginData) {
    this.userService.login(loginData);
  }
}
