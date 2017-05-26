import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'search-artist',
  templateUrl: './search-artist.component.html',
  styleUrls: ['./search-artist.component.css']
})
export class SearchArtistComponent{
  spotifySearch: string;
  spotifyResults: any;
  
  constructor(
      private userService: UserService
  ){}
  search(){
    if(this.spotifySearch){
      this.userService.search(this.spotifySearch).subscribe(res =>{
        this.spotifyResults = res.artists.items;
       })
    }else{
      this.spotifyResults = null;
    }
  }

}