import { Component, OnInit} from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'homePage',
  templateUrl: './homePage.component.html',
  styleUrls: ['./homePage.component.css']
})
export class HomePageComponent implements OnInit{
  constructor(
    private userService: UserService,
  ){}
ngOnInit(){
  this.userService.isLoggedIn();
}
}
