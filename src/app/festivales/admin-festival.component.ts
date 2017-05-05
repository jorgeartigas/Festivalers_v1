import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { UserService } from '../services/user.service';


@Component({
  selector: 'admin-festival',
  templateUrl: './admin-festival.component.html',
  styleUrls: ['./admin-festival.component.css']
})
export class AdminFestivalComponent {
    festivales: FirebaseListObservable<any>;
    constructor(
        private af: AngularFire,
        private userService: UserService
    ){
        this.festivales = this.af.database.list('/FESTIVALERS/festivalesPendientes');
    }

    validateFestival(festival: any){
        this.userService.validateFestival(festival);
    }
    discardFestival(festival: any){
        this.userService.discardFestival(festival);
    }
    
}