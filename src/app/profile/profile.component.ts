import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { StorageService } from '../services/storage.service';
import { CurrentUserData } from '../services/user-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  idProfile:string;
  profile:any;
  festivals:any;
  activeView:string;
  
    constructor(
        private af: AngularFire,
        private storageService: StorageService,
        public userData: CurrentUserData,
        private route:ActivatedRoute
    ){}
  ngOnInit(){
    this.route.params.first().subscribe(params => {
        this.idProfile = params['id'];
        this.af.database.object('FESTIVALERS/Users/'+this.idProfile).first().subscribe(profile => {
            this.profile=profile;
        });
    })
  }
  upload(file){
    if(file){
      this.storageService.upload(file.target.files[0],0);
    }
  }
  activateView(val?:string){
    this.activeView = val;
  }
}
