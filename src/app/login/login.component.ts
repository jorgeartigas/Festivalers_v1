import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent{

constructor(private userService: UserService){}

login(username,password) {
  this.userService.login(username,password);
}
}
