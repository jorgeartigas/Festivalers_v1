import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { StorageService } from '../services/storage.service';
import { CurrentUserData } from '../services/user-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent{
  userUID:string;
  festivals:any;
    constructor(
        private af: AngularFire,
        private storageService: StorageService,
        public userData: CurrentUserData,
        private route:ActivatedRoute
    ){}
  upload(file,path){
    this.storageService.upload(file.target.files[0],path);
  }
// preview(event) {
//   if (event.target.files && event.target.files[0]) {
//     var reader = new FileReader();
//     reader.onload = (event:any) => {
//       this.previewURL = event.target.result;
//     }
//     reader.readAsDataURL(event.target.files[0]);
//   }
// }

}
