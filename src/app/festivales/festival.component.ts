import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { StorageService } from '../services/storage.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from '../services/user.service';
import { FestivalService } from '../services/festival.service';

@Component({
  selector: 'festival',
  templateUrl: './festival.component.html',
  styleUrls: ['./festival.component.css']
})
export class FestivalComponent implements OnInit {
    idFestival:string;
    festival:any;
    attendees: any;
    userFestival: any;

    constructor(
        private af: AngularFire,
        private storageService: StorageService,
        private route: ActivatedRoute,
        private userService: UserService,
        private festivalService: FestivalService,
    ){}
    ngOnInit(){
        this.userService.isLoggedIn();
        this.route.params.first().subscribe(params => {
            this.idFestival = params['id'];
            this.af.database.object('FESTIVALERS/festivales/'+this.idFestival).first().subscribe(festival => {
                this.festival=festival;
            });
            this.af.database.list('FESTIVALERS/festivalAttendees/'+this.idFestival).subscribe(attendees =>{
                this.attendees = attendees;
            });
        });
    }
    addAttendee(){
        this.festivalService.addAttendee(this.idFestival,this.userService.userUid);
    }
}