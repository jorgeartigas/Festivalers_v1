import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { UserService } from '../services/user.service';
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
        private userService: UserService
    ){
        this.festivales = this.af.database.list('/festivales');
    }
    addFestival(){
        this.newFestival.owner = this.userService.userUid;
        this.festivalService.addFestival(this.newFestival);
    }
}
