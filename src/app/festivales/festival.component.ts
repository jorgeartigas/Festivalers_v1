import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { StorageService } from '../services/storage.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { MapComponent } from '../map/maps.component';
import { FestivalService } from '../services/festival.service';
import { CurrentUserData } from '../services/user-data.service';

@Component({
  selector: 'festival',
  templateUrl: './festival.component.html',
  styleUrls: ['./festival.component.css']
})
export class FestivalComponent implements OnInit, OnDestroy {
    idFestival: string;
    festival: any;
    going: boolean;
    attendees: any;
    sub: any;
    activeView:string;
    owner:true;
    
    constructor(
        public af: AngularFire,
        public storageService: StorageService,
        public route: ActivatedRoute,
        public festivalService: FestivalService,
        public userData: CurrentUserData
    ){}

    ngOnInit(){
        this.route.params.first().subscribe(params => {
            this.idFestival = params['id'];
            this.af.database.object('FESTIVALERS/festivales/'+this.idFestival).first().subscribe(festival => {
                if(festival.owner===this.userData.userUID) 
                    this.owner=true;
                this.festival=festival;
            });
            this.sub = this.af.database.list('FESTIVALERS/festivalAttendees/'+this.idFestival).subscribe(attendees =>{
                this.attendees = attendees;
                for(let i=0;i<attendees.length;i++){ 
                    if(attendees[i].$key === this.userData.userUID){
                        this.going=true;
                    }
                }
            });
        });
    }
    addAttendee(){
        this.festivalService.addAttendee(this.idFestival);
    }
    removeAttendee(){
        this.going=false;
        this.festivalService.removeAttendee(this.idFestival);
    }
    activateView(val?:string){
        this.activeView = val;
    }
    ngOnDestroy(){
        this.sub.unsubscribe();
    }
}