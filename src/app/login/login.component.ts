import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent{

<<<<<<< HEAD
constructor(public userService: UserService){}
=======

constructor(public loginService: LoginService){}
>>>>>>> refs/remotes/origin/master
  login(loginData) {
    this.loginService.login(loginData);
  }

  getBackground() {
    let backgroundImage = {
       'background-image': 'url(\'../../assets/bg.png\')',
       'background-repeat': 'no-repeat',
       'background-size': 'cover',
       'background-position': 'center center',
       'height': '500px'
    };

    return backgroundImage;
}
}
