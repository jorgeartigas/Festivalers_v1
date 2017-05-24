import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { CurrentUserData } from '../services/user-data.service';
import { FestivalService } from '../services/festival.service';
import { Router } from '@angular/router';

@Component({
  selector: 'profileOwnFestivals',
  templateUrl: './profile-own-festivals.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileOwnFestivalsComponent implements OnInit{
  ownFestivals:FirebaseListObservable<any>;
  
  constructor(
    public userData: CurrentUserData,
    public festivalService: FestivalService,
    public router: Router,
    public af : AngularFire
  ){}

  ngOnInit(){
      this.ownFestivals = this.af.database.list('FESTIVALERS/UsersFestivalOwners/'+this.userData.userUID);
  }
}