import { Injectable, } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { UserService } from './user.service';
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
    private userService: UserService
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

  addAttendee(idFestival,userUid){
      this.af.database.object('FESTIVALERS/Users/'+userUid).first().subscribe(user => {
        this.af.database.object('FESTIVALERS/festivalAttendees/'+idFestival+'/'+userUid).update({name: user.name,profilePhoto: user.profilePhoto})
        .then(()=>{
          this.af.database.object('FESTIVALERS/festivales/'+idFestival).first().subscribe(festival =>{
            this.af.database.object('FESTIVALERS/UsersFestivals/'+userUid+'/'+idFestival).update({name: festival.name,mainPhoto: festival.mainPhoto});
          })
        }
        );
      });
  }
}
