import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'signUp',
  templateUrl: 'signUp.component.html',
  styleUrls: [ './signUp.component.css' ]
})
export class SignUpComponent{

constructor(private userService: UserService){}

signUp(email,password,name,lastname,age,city){
  this.userService.signUp(email,password,name,lastname,age,city);
}
}
