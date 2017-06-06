import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { CurrentUserData } from './user-data.service';

@Injectable()
export class UserService {
  searchURL: string;
  searchCountry: string;
  artistURL: string;
  albumsURL:string;
  topTracks: string;
  similar: string;
  results: any[];
  apiKey: string = '9cf654c3a4c1332e1239c7c2578f8184';

  constructor(
    public userData : CurrentUserData,
    public af : AngularFire,
    private http: Http
  ) {}

  changeProfilePhoto(downloadURL){
    this.af.database.object('FESTIVALERS/Users/'+this.userData.userUID).update({profilePhoto: downloadURL});
    this.userData.festivals.forEach(idFestival => {
          this.af.database.object('FESTIVALERS/festivalAttendees/'+idFestival+'/'+this.userData.userUID).update({profilePhoto: downloadURL});
    });
  }
  update(festivals){
    this.af.database.object('FESTIVALERS/Users/'+this.userData.userUID).update(this.userData.currentUser);
    this.userData.festivals.forEach(festival => {
      this.af.database.object('FESTIVALERS/festivalAttendees/'+festival+'/'+this.userData.userUID).update({name: this.userData.currentUser.name});
    })
  }
  addFavorite(artistId,artistName,artistPhoto){
    this.af.database.object('FESTIVALERS/UsersArtists/'+this.userData.userUID+'/'+artistId).update({ name:artistName, photo:artistPhoto })
  }
  removeFavorite(artistId){
    this.af.database.object('FESTIVALERS/UsersArtists/'+this.userData.userUID+'/'+artistId).remove();
  }
  removeNotification(id){
    this.af.database.object('FESTIVALERS/UserNotifications/'+this.userData.userUID+'/'+id).remove();
  }
  search(name){
    this.searchURL = 'http://ws.audioscrobbler.com/2.0/?method=artist.search&artist='+name+'&api_key='+this.apiKey+'&format=json';
    return this.http.get(this.searchURL).map(res => res.json());
  }
  getArtistsByCountry(location){
    this.searchCountry = 'http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country='+location+'&api_key='+this.apiKey+'&format=json';
    return this.http.get(this.searchCountry).map(res => res.json());
  }
  getArtist(id){
    this.artistURL = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&mbid='+id+'&api_key='+this.apiKey+'&format=json';
    return this.http.get(this.artistURL).map(res => res.json());
  }
  getAlbums(id){
    this.albumsURL = 'http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&mbid='+id+'&api_key='+this.apiKey+'&format=json';
    return this.http.get(this.albumsURL).map(res => res.json());
  }
  getTopTracks(id){
    this.topTracks = 'http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&mbid='+id+'&api_key='+this.apiKey+'&format=json';
    return this.http.get(this.topTracks).map(res => res.json());
  }
  getSimilar(id){
    this.similar = 'http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&mbid='+id+'&api_key='+this.apiKey+'&format=json';
    return this.http.get(this.similar).map(res => res.json());
  }
  getFestivals(){
    this.af.database.list('FESTIVALERS/festivales').first().subscribe(results => {
        this.results = results;
    })
  }
  searchFestival(style?,month?,location?):any{
    this.af.database.list('FESTIVALERS/festivales').first().subscribe(results => {
        this.results = results;
        results.forEach(filterStyle => {
            if(style){
                this.results = this.results.filter(fest => fest.style === style);
            }
            if(month){
                this.results = this.results.filter(fest => fest.month === month);
            }
            if(location){
                this.results = this.results.filter(fest => fest.location === location);
            }
        })
      })
  }
}
