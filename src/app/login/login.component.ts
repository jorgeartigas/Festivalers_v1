import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent{


constructor(public loginService: LoginService){}
  login(loginData) {
    this.loginService.login(loginData);
  }
}
