import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { UserService } from '../services/user.service';


@Component({
  selector: 'add-festival',
  templateUrl: './add-festival.component.html',
  styleUrls: ['./add-festival.component.css']
})
export class AddFestivalComponent {
    festivales: FirebaseListObservable<any>;
    constructor(
        private af: AngularFire,
        private userService: UserService
    ){
        this.festivales = this.af.database.list('/festivales');
    }
    //tendria que estar en un servicio
    addFestival(festivalName: String,description: String,mainImage:String,festivalStartDate:String,festivalEndDate:String) { 
        this.userService.addFestival(festivalName,description,mainImage,festivalStartDate,festivalEndDate);
  }
}
