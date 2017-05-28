import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { CurrentUserData } from './user-data.service';

@Injectable()
export class UserService {
  searchURL: string;
  artistURL: string;
  albumsURL:string;
  albumURL: string;
  topTracks: string;

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
  search(name, type="artist"){
    this.searchURL = 'https://api.spotify.com/v1/search?query='+name+'&offset=0&limit=20&type='+type+'&market=US';
    return this.http.get(this.searchURL).map(res => res.json());
  }
  getArtist(id){
    this.artistURL = 'https://api.spotify.com/v1/artists/'+id;
    return this.http.get(this.artistURL).map(res => res.json());
  }
  getAlbums(artistId){
    this.albumsURL = 'https://api.spotify.com/v1/artists/'+artistId+'/albums';
    return this.http.get(this.albumsURL).map(res => res.json());
  }
  getAlbum(id){
    this.albumURL = 'https://api.spotify.com/v1/albums/'+id;
    return this.http.get(this.albumURL).map(res => res.json());
  }
  getTopTracks(artistId){
    this.topTracks = 'https://api.spotify.com/v1/artists/'+artistId+'/top-tracks?country=ES';
    return this.http.get(this.topTracks).map(res => res.json());
  }

}
