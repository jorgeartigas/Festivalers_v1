import { Injectable, } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { CurrentUserData } from '../services/user-data.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/first';



@Injectable()
export class FestivalService{
  festivalesPendientes: FirebaseListObservable<any> = this.af.database.list('/FESTIVALERS/festivalesPendientes');
  festivales: FirebaseListObservable<any>=this.af.database.list('/FESTIVALERS/festivales');
  arrayAttendees: Array<string> = [];
  arrayFestivales: Array<string> = [];

  constructor(
    private router: Router,
    private af: AngularFire,
    private userData: CurrentUserData
  ) {}

  addFestival(newFestival){
    this.af.database.list('FESTIVALERS/festivalesPendientes/').push(newFestival);
  }
  validateFestival(festival: any){
      this.festivales.push(festival).then(()=> this.festivalesPendientes.remove(festival));
    }
  discardFestival(festival: any){
    this.festivalesPendientes.remove(festival); 
  }

  addAttendee(idFestival){
        this.af.database.object('FESTIVALERS/festivalAttendees/'+idFestival+'/'+this.userData.userUID).update({name: this.userData.currentUser.name,profilePhoto: this.userData.currentUser.profilePhoto})
        .then(()=>{
          this.af.database.object('FESTIVALERS/festivales/'+idFestival).first().subscribe(festival =>{
            this.af.database.object('FESTIVALERS/UsersFestivals/'+this.userData.userUID+'/'+idFestival).update({name: festival.name,mainPhoto: festival.mainPhoto});
          })
        }
        );
  }
  removeAttendee(idFestival){
    this.af.database.object('FESTIVALERS/festivalAttendees/'+idFestival+'/'+this.userData.userUID).remove();
    this.af.database.object('FESTIVALERS/UsersFestivals/'+this.userData.userUID+'/'+idFestival).remove();
  }
}
