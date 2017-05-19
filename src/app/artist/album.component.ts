import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Http, Response } from '@angular/http';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { CurrentUserData } from '../services/user-data.service';

@Component({
  selector: 'album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit{
  albumId:string;
  album: any;

  constructor(
      public af: AngularFire,
      private http: Http,
      private userService: UserService,
      private route: ActivatedRoute
  ){}

  ngOnInit(){
      this.route.params.first().subscribe(params => {
            this.albumId = params['id'];
            this.userService.getAlbum(this.albumId).first().subscribe(album =>{
                this.album=album;
                console.log(this.album);
            })
      })
  }
}