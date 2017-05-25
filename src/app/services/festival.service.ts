import { Injectable, } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { CurrentUserData } from '../services/user-data.service';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/first';



@Injectable()
export class FestivalService{
  festivalesPendientes: FirebaseListObservable<any> = this.af.database.list('/FESTIVALERS/festivalesPendientes');
  festivales: FirebaseListObservable<any>=this.af.database.list('/FESTIVALERS/festivales');
  arrayAttendees: Array<string> = [];
  arrayFestivales: Array<string> = [];
  URL:string;
  response:any;
  constructor(
    private router: Router,
    private af: AngularFire,
    private userData: CurrentUserData,
    private http: Http
  ) {}

  addFestival(newFestival){
    this.af.database.list('FESTIVALERS/festivalesPendientes/').push(newFestival);
  }
  validateFestival(festival: any){
      this.af.database.list('FESTIVALERS/festivales/').push(festival).then(newfestival =>{
        this.af.database.object('FESTIVALERS/UsersFestivalOwners/'+festival.owner+'/'+newfestival.key).set(festival);
      });
      this.af.database.list('FESTIVALERS/festivalesPendientes/').remove(festival);
    }
  discardFestival(festival: any){
    this.festivalesPendientes.remove(festival); 
  }
  uploadMainPhoto(idFestival,downloadURL){
    this.af.database.object('FESTIVALERS/festivales/'+idFestival).update({mainPhoto: downloadURL});
    this.af.database.object('FESTIVALERS/UsersFestivals/'+this.userData.userUID+'/'+idFestival).update({mainPhoto: downloadURL});
    this.af.database.object('FESTIVALERS/UsersFestivalOwners/'+this.userData.userUID+'/'+idFestival).update({mainPhoto: downloadURL});
  
  }
  addAttendee(idFestival){
        this.af.database.object('FESTIVALERS/festivalAttendees/'+idFestival+'/'+this.userData.userUID).update({name: this.userData.currentUser.name,profilePhoto: this.userData.currentUser.profilePhoto})
        .then(()=>{
          this.userData.festivals.push(idFestival);
          this.af.database.object('FESTIVALERS/festivales/'+idFestival).first().subscribe(festival =>{
            this.af.database.object('FESTIVALERS/UsersFestivals/'+this.userData.userUID+'/'+idFestival).update({name: festival.name,mainPhoto: festival.mainPhoto});
          })
        }
        );
  }
  removeAttendee(idFestival){
    this.af.database.object('FESTIVALERS/festivalAttendees/'+idFestival+'/'+this.userData.userUID).remove();
    this.af.database.object('FESTIVALERS/UsersFestivals/'+this.userData.userUID+'/'+idFestival).remove();
    this.userData.festivals.splice(this.userData.festivals.indexOf(idFestival),1);
    console.warn(this.userData.festivals);
  }
  mapLocation(name:string){
    this.URL = "https://maps.googleapis.com/maps/api/geocode/json?address="+name+"&key=AIzaSyAgJusLHUIkIGgvTQJyB5_TtSxJTWlFNXo";
    return this.http.get(this.URL).map(res => JSON.parse(res.text()));
  }
}
