import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { CurrentUserData } from '../services/user-data.service';
import { FestivalService } from '../services/festival.service';
import { Router } from '@angular/router';

@Component({
  selector: 'profileFestivals',
  templateUrl: './profile-festivals.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileFestivalsComponent implements OnInit{
  festivals:FirebaseListObservable<any>;
  
  constructor(
    public userData: CurrentUserData,
    public festivalService: FestivalService,
    public router: Router,
    public af : AngularFire
  ){}

  ngOnInit(){
      this.festivals = this.af.database.list('FESTIVALERS/UsersFestivals/'+this.userData.userUID);
  }
}