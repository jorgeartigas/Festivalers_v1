import { Component, OnInit, Input } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { CurrentUserData } from '../services/user-data.service';
import { FestivalService } from '../services/festival.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'profileArtists',
  templateUrl: './profile-artists.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileArtistsComponent {
    artists:any;
    sub:any;
    searchDisplay:boolean;

    constructor(
      public userData: CurrentUserData,
      public router: Router,
      public af : AngularFire,
      private userService: UserService
  ){}

  ngOnInit(){
    this.sub = this.af.database.list('FESTIVALERS/UsersArtists/'+this.userData.userUID).subscribe(artists => {
        this.artists = artists;
        if(!artists[0]){
            this.searchDisplay=true;
        }
        });
  }
  removeFavorite(id){
    this.userService.removeFavorite(id);
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}