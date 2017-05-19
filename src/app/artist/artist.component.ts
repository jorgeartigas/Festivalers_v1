import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Http, Response } from '@angular/http';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { CurrentUserData } from '../services/user-data.service';

@Component({
  selector: 'artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit{
  id:string;
  artistName:string;
  artistPhoto:string;
  favorite:boolean;
  sub:any;
  artist: any;
  albums: any;
  topTracks: any;

  constructor(
      public af: AngularFire,
      private http: Http,
      private userService: UserService,
      private route: ActivatedRoute,
      private userData: CurrentUserData
  ){}

  ngOnInit(){
      this.route.params.first().subscribe(params => {
            this.id = params['id'];
            this.userService.getArtist(this.id).first().subscribe(artist => {
              this.artist = artist;
              this.artistName = artist.name;
              this.artistPhoto = artist.images[0].url;
            });
            this.sub = this.af.database.list('FESTIVALERS/UsersArtists/'+this.userData.userUID).subscribe(artists =>{
                for(let i=0;i<artists.length;i++){ 
                    if(artists[i].$key === this.id){
                        this.favorite=true;
                    }
                }
            });
            this.userService.getTopTracks(this.id).first().subscribe(topTracks => {
              this.topTracks = topTracks;
            });
            this.userService.getAlbums(this.id).first().subscribe(albums => {
              this.albums = albums.items;
            });
      })
  }
  addFavorite(){
      this.userService.addFavorite(this.id,this.artistName,this.artistPhoto);
  }
  removeFavorite(){
    this.favorite = false;
    this.userService.removeFavorite(this.id);
  }
}