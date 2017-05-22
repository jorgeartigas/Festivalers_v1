import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { CurrentUserData } from '../services/user-data.service';
import { FestivalService } from '../services/festival.service';
import { Festival } from './festival';

@Component({
  selector: 'edit-festival',
  templateUrl: './edit-festival.component.html',
  styleUrls: ['./edit-festival.component.css']
})
export class EditFestivalComponent {
    editFestival = new Festival ('','','','','','','','','','',[],true,'',Date.now());
    constructor(
        private festivalService: FestivalService,
        private userData: CurrentUserData
    ){}

}
