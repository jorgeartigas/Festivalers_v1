import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { StorageService } from '../services/storage.service';
import { CurrentUserData } from '../services/user-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent{
  festivals:any;
  artistView:boolean = false;
  festivalView:boolean = true;
    constructor(
        private af: AngularFire,
        private storageService: StorageService,
        public userData: CurrentUserData,
        private route:ActivatedRoute
    ){}
  upload(file){
    if(file){
      this.storageService.upload(file.target.files[0],0);
    }
  }

  activateView(){
    this.artistView = !this.artistView;
    this.festivalView = !this.festivalView;
  }
}