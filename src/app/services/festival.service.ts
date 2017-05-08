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
  arrayAttendees: Array<string>;

  constructor(
    private router: Router,
    private af: AngularFire
  ) {}
addAttendee(idFestival,userUid){
    this.af.database.object('FESTIVALERS/festivalAttendees/'+idFestival).subscribe(snap => {
        this.arrayAttendees=snap;
        //this.arrayAttendees.push(userUid);
        //console.log(this.arrayAttendees);
    })
    console.log(userUid);
    //this.af.database.object('FESTIVALERS/festivalAttendees/'+idFestival).update(this.arrayAttendees);
}

addFestival(festivalName: String,estilo:String,mes:String,pais:String,description: String,mainImage:String,festivalStartDate:String,festivalEndDate:String) { 
  if (!festivalName||!estilo||!description||!mainImage||!festivalStartDate||!festivalEndDate) { return; } 
    this.festivalesPendientes.push({ name: festivalName,estilo: estilo,mes: mes,pais: pais,description: description,mainImage: mainImage,startDate:festivalStartDate,endDate: festivalEndDate});
  }
validateFestival(festival: any){
    this.festivales.push(festival).then(()=> this.festivalesPendientes.remove(festival));
  }
discardFestival(festival: any){
   this.festivalesPendientes.remove(festival); 
}
}
