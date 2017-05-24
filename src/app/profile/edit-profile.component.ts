import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { StorageService } from '../services/storage.service';
import { CurrentUserData } from '../services/user-data.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent{
  festivals:any;
  activeView:string;
  editado: boolean = false;
    constructor(
        private af: AngularFire,
        private storageService: StorageService,
        public userData: CurrentUserData,
        public userService: UserService,
        private route:ActivatedRoute
    ){}

  upload(file){
    if(file){
      this.storageService.upload(file.target.files[0],0);
    }
  }
  update(){
    this.userService.update(this.festivals);
    this.editado=false;
  }

  activateView(value?:string){
    this.activeView = value;
  }
}
