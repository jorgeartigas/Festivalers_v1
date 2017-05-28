import { Injectable, } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { CurrentUserData } from '../services/user-data.service';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/first';
import { UUID } from 'angular2-uuid';



@Injectable()
export class FestivalService{
  festivalesPendientes: FirebaseListObservable<any> = this.af.database.list('/FESTIVALERS/festivalesPendientes');
  festivales: FirebaseListObservable<any>=this.af.database.list('/FESTIVALERS/festivales');
  arrayAttendees: Array<string> = [];
  URL:string;
  response:any;
  name:string;
  constructor(
    private router: Router,
    private af: AngularFire,
    private userData: CurrentUserData,
    private http: Http
  ) {}

  addFestival(newFestival){
    this.festivalesPendientes.push(newFestival).then(fest=>{
      this.af.database.object('FESTIVALERS/UserNotifications/'+this.userData.userUID+'/'+fest.key).update({name:newFestival.name,msg:'Tu festival esta pendiente de validacion',status:false,date:Date.now()})
      this.router.navigate(['home']);
    });
  }
  updateFestival(idFestival,festival){
    this.af.database.object('FESTIVALERS/festivales/'+idFestival).update(festival);
    this.af.database.object('FESTIVALERS/UsersFestivals/'+this.userData.userUID+'/'+idFestival).update({name: festival.name});
    this.af.database.object('FESTIVALERS/UsersFestivalOwners/'+this.userData.userUID+'/'+idFestival).update(festival);
  }
  validateFestival(festival: any){
      this.af.database.list('FESTIVALERS/festivales/').push(festival).then(newfestival =>{
        this.af.database.object('FESTIVALERS/UsersFestivalOwners/'+festival.owner+'/'+newfestival.key).set(festival);
        this.af.database.object('FESTIVALERS/UserNotifications/'+festival.owner+'/'+newfestival.key).update({name:festival.name,msg:'Tu festival ha sido aceptado',status:true,date:Date.now()})
      });
      this.af.database.list('FESTIVALERS/festivalesPendientes/').remove(festival);
    }
  discardFestival(festival: any){
    this.af.database.object('FESTIVALERS/UserNotifications/'+festival.owner+'/'+UUID.UUID()).update({name:festival.name,msg:'Tu festival ha sido rechazado',status:false,date:Date.now()});
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
  }
  mapLocation(address:string){
    this.URL = "https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyAgJusLHUIkIGgvTQJyB5_TtSxJTWlFNXo";
    return this.http.get(this.URL).map(res => JSON.parse(res.text()));
  }
  addHeadLiner(idFestival,artistId,artistName,artistPhoto){
    this.af.database.object('FESTIVALERS/FestivalsArtists/'+idFestival+'/headLiner/'+artistId).update({name:artistName,photo:artistPhoto});
  }
  addGeneral(idFestival,artistId,artistName,artistPhoto){
    this.af.database.object('FESTIVALERS/FestivalsArtists/'+idFestival+'/general/'+artistId).update({name:artistName,photo:artistPhoto});
  }
  removeArtist(idFestival,idArtist,path){
    this.af.database.object('FESTIVALERS/FestivalsArtists/'+idFestival+'/'+path+'/'+idArtist).remove();
  }
  createNotification(idFestival){
    this.af.database.object('FESTIVALERS/festivales/'+idFestival).first().subscribe(festival =>{
      this.name = festival.name;
      this.af.database.list('FESTIVALERS/festivalAttendees/'+idFestival+'/').first().subscribe(attendees => {
        for(let i =0;i<attendees.length;i++)
          this.af.database.object('FESTIVALERS/UserNotifications/'+attendees[i].$key+'/'+idFestival).update({name:this.name,msg:'ha añadido una nueva noticia',status:true,date: Date.now()})
      })
    });
  }
}
