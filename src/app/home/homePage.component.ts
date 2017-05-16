import { Component} from '@angular/core';
import { CurrentUserData } from '../services/user-data.service';

@Component({
  selector: 'homePage',
  templateUrl: './homePage.component.html',
  styleUrls: ['./homePage.component.css']
})
export class HomePageComponent{
  constructor(public userData: CurrentUserData){}
}
