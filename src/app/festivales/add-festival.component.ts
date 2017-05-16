import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { CurrentUserData } from '../services/user-data.service';
import { FestivalService } from '../services/festival.service';
import { Festival } from './festival';


@Component({
  selector: 'add-festival',
  templateUrl: './add-festival.component.html',
  styleUrls: ['./add-festival.component.css']
})
export class AddFestivalComponent {
    newFestival = new Festival ('','','','','','','','','','',[],true,'',Date.now());
    festivales: FirebaseListObservable<any>;
    constructor(
        private af: AngularFire,
        private festivalService: FestivalService,
        private userData: CurrentUserData
    ){
        this.festivales = this.af.database.list('/festivales');
    }
    addFestival(){
        this.newFestival.owner = this.userData.userUID;
        this.festivalService.addFestival(this.newFestival);
    }
}
