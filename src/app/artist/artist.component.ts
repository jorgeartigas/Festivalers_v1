import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Http, Response } from '@angular/http';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CurrentUserData } from '../services/user-data.service';

@Component({
  selector: 'artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit,OnDestroy{
  id: string;
  artistName: string;
  artistPhoto: string;
  favorite: boolean;
  sub: any;
  artist: any;
  albums: any;
  topTracks: any;
  similars: any;
  moreTracks: boolean = false;
  limitTracks: number = 4;
  moreSimilars: boolean = false;
  limitSimilars: number = 8;


  constructor(
      public af: AngularFire,
      private http: Http,
      private userService: UserService,
      private route: ActivatedRoute,
      private router: Router,
      private userData: CurrentUserData
  ){}

  ngOnInit(){
      this.route.params.subscribe(params => {
            this.id = params['id'];
            this.userService.getArtist(this.id).first().subscribe(artist => {
              console.log(artist.artist)
              this.artist = artist.artist;
              this.artistName = artist.artist.name;
              this.artistPhoto = artist.artist.image[2]['#text'];
            });
            this.sub = this.af.database.list('FESTIVALERS/UsersArtists/'+this.userData.userUID).subscribe(artists =>{
                for(let i=0;i<artists.length;i++){ 
                    if(artists[i].$key === this.id){
                        this.favorite=true;
                    }
                }
            });
            this.userService.getTopTracks(this.id).first().subscribe(topTracks => {
              this.topTracks = topTracks.toptracks.track;
            });
            this.userService.getAlbums(this.id).first().subscribe(albums => {
              this.albums = albums.topalbums.album;
            });
            this.userService.getSimilar(this.id).first().subscribe(similar => {
              this.similars = similar.similarartists.artist;
            })
      })
      this.router.events.subscribe((event) => {
        if (!(event instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0)
      });
  }
  addFavorite(){
      this.userService.addFavorite(this.id,this.artistName,this.artistPhoto);
  }
  removeFavorite(){
    this.favorite = false;
    this.userService.removeFavorite(this.id);
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}