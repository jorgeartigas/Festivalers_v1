import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { UserService } from '../services/user.service';

@Component({
  selector: 'search-festival',
  templateUrl: './search-festival.component.html',
  styleUrls: ['./search-festival.component.css']
})
export class SearchFestivalComponent{  
  style = ''
  month = '';
  location = '';

  constructor(
      public af: AngularFire,
      public userService: UserService
  ){}

  search(){
    this.userService.searchFestival(this.style,this.month,this.location);
  }
}