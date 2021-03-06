import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AngularFire } from 'angularfire2';
import { CurrentUserData } from '../services/user-data.service'

@Component({
  selector: 'search-artist',
  templateUrl: './search-artist.component.html',
  styleUrls: ['./search-artist.component.css']
})
export class SearchArtistComponent implements OnInit{
  lastFmSearch: string;
  popular:any;
  lastFmResults: any;
  
  constructor(
      public userService: UserService,
      public userData: CurrentUserData,
      public af: AngularFire
  ){}
  ngOnInit(){
    this.af.auth.first().subscribe(uid => {
      if(uid){
        this.af.database.object('FESTIVALERS/Users/'+uid.uid).first().subscribe(user=>{
            this.userService.getArtistsByCountry(user.location).subscribe(artists => {
              this.popular = artists.topartists.artist;
            })
        })
      }
    })

  }
  search(){
    if(this.lastFmSearch){
      this.userService.search(this.lastFmSearch).subscribe(res =>{
        this.lastFmResults = res.results.artistmatches.artist
       })
    }else{
      this.lastFmResults = null;
    }
  }

}