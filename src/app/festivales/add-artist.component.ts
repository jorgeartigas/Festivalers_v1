import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./festival.component.css']
})
export class AddArtistComponent{
  headLiner: string;
  general: string;
  spotifyResults:any;
  searchURL: string
  activeView: string;
  
  constructor(
      private userService: UserService
  ){}
  search(){
    if(this.headLiner){
      this.userService.search(this.headLiner).subscribe(res =>{
        this.spotifyResults = res.artists.items;
      })
    }else{
      this.spotifyResults = null;
    }
  }

}