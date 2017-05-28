import { Component,OnInit,OnDestroy} from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FestivalService } from '../services/festival.service';

@Component({
  selector: 'admin-festival',
  templateUrl: './admin-festival.component.html',
  styleUrls: ['./admin-festival.component.css']
})
export class AdminFestivalComponent implements OnInit,OnDestroy{
    sub:any;
    festivales: any;
    activeView: string;
    constructor(
        private af: AngularFire,
        private festivalService: FestivalService
    ){}
    ngOnInit(){
        this.sub = this.af.database.list('/FESTIVALERS/festivalesPendientes').subscribe(festivales => {
            this.festivales = festivales;
        })
    }
    validateFestival(festival: any){
        this.festivalService.validateFestival(festival);
    }
    discardFestival(festival: any){
        this.festivalService.discardFestival(festival);
    }
    ngOnDestroy(){
        this.sub.unsubscribe();
    }
}