import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FestivalService } from '../services/festival.service';

@Component({
  selector: 'admin-festival',
  templateUrl: './admin-festival.component.html',
  styleUrls: ['./admin-festival.component.css']
})
export class AdminFestivalComponent {
    festivales: FirebaseListObservable<any>;
    activeView: string;
    constructor(
        private af: AngularFire,
        private festivalService: FestivalService
    ){
        this.festivales = this.af.database.list('/FESTIVALERS/festivalesPendientes');
    }
    
    validateFestival(festival: any){
        this.festivalService.validateFestival(festival);
    }
    discardFestival(festival: any){
        this.festivalService.discardFestival(festival);
    }
    
}