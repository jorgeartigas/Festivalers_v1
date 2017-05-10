import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';


@Injectable()
export class FestivalService{
  festivalesPendientes: FirebaseListObservable<any> = this.af.database.list('/FESTIVALERS/festivalesPendientes');
  festivales: FirebaseListObservable<any>=this.af.database.list('/FESTIVALERS/festivales');
  arrayAttendees: Array<string> = [];
  arrayFestivales: Array<string> = [];

  constructor(
    private router: Router,
    private af: AngularFire
  ) {}

  addFestival(newFestival){
    this.af.database.list('FESTIVALERS/festivales/').push(newFestival);
  }
  validateFestival(festival: any){
      this.festivales.push(festival).then(()=> this.festivalesPendientes.remove(festival));
    }
  discardFestival(festival: any){
    this.festivalesPendientes.remove(festival); 
  }

  // BASTANTE PRECARIO - MODIFICAR
  addAttendee(idFestival,userUid){
    this.af.database.object('FESTIVALERS/festivales/'+idFestival).first().subscribe(festival => {
        if(festival.asistentes){
          //implementar funcion para saber si ese userUid ya asiste al evento
          this.arrayAttendees = festival.asistentes;
          this.arrayAttendees.push(userUid);
          this.af.database.object('FESTIVALERS/festivales/'+idFestival).update({asistentes: this.arrayAttendees})
            .then(()=>{this.addFestivalToUser(idFestival,userUid);}
             ); 
        }
        else{
          this.arrayAttendees.push(userUid);
          this.af.database.object('FESTIVALERS/festivales/'+idFestival).update({asistentes: this.arrayAttendees})
          .then(()=>{this.addFestivalToUser(idFestival,userUid);}
          ); 
        }
    });
  }

  addFestivalToUser(idFestival,userUid){
     this.af.database.object('FESTIVALERS/Users/'+userUid).first().subscribe(user => {
       console.log(user);
        if(user.festivales){
          this.arrayFestivales = user.festivales;
          this.arrayFestivales.push(idFestival);
          this.af.database.object('FESTIVALERS/Users/'+userUid).update({festivales: this.arrayFestivales});
        }
        else{
          this.arrayFestivales.push(idFestival);
          this.af.database.object('FESTIVALERS/Users/'+userUid).update({festivales: this.arrayFestivales});
        }
    });
  }

}
