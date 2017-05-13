import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  imgURL:string = null;
  userUid: string;
  previewURL:string;

    constructor(
        private af: AngularFire,
        private storageService: StorageService,
        private userService: UserService
    ){}
ngOnInit(){
  this.userUid = this.userService.userUid;
}
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
