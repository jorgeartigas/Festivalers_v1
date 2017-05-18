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
