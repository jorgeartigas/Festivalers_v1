import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { AngularFire } from 'angularfire2';
import { FestivalService } from '../services/festival.service';

@Component({
  selector: 'add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./festival.component.css']
})
export class AddArtistComponent implements OnInit{
  @Input() idFestival:string;
  searchSpotify: string;
  spotifyResults:any;
  searchURL: string
  activeView: string;
  headLinersArtists: any;
  generalArtists:any;
  
  constructor(
      private userService: UserService,
      private af: AngularFire,
      public festivalService: FestivalService
  ){}

  ngOnInit(){
    this.af.database.list('FESTIVALERS/FestivalsArtists/'+this.idFestival+'/headLiner').subscribe(artists => {
      this.headLinersArtists = artists;
    })
    this.af.database.list('FESTIVALERS/FestivalsArtists/'+this.idFestival+'/general').subscribe(artists => {
      this.generalArtists = artists;
    })
  }
  addHeadLiner(id,artistName,artistPhoto){
    this.festivalService.addHeadLiner(this.idFestival,id,artistName,artistPhoto);
  }
  addGeneral(id,artistName,artistPhoto){
    this.festivalService.addGeneral(this.idFestival,id,artistName,artistPhoto);
  }
  removeArtist(idArtist,path){
    this.festivalService.removeArtist(this.idFestival,idArtist,path);
  }
  search(val?:number){
    if(this.searchSpotify){
        this.userService.search(this.searchSpotify).subscribe(res =>{
            this.spotifyResults = res.artists.items;
      });
    }else{
      this.spotifyResults = null;
    }
  }

}