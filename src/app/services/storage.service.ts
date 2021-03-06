import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { UserService } from './user.service';
import { CurrentUserData } from './user-data.service';
import { FestivalService } from './festival.service';
import { UUID } from 'angular2-uuid';

@Injectable()
export class StorageService {
private storageRef = firebase.storage().ref();
downloadURL:string;
done:boolean = false;
constructor(
    public userData: CurrentUserData,
    public userService: UserService,
    public festivalService: FestivalService
    ) {}

upload(file,value,idFestival?,idNoticia?){
const that = this;
let uploadTask
// Upload file and metadata to the object
if(value===0){
     uploadTask = this.storageRef.child('images/profile_pictures/'+ this.userData.userUID).put(file);
}else if(value===1){
    uploadTask = this.storageRef.child('images/festival_main_pictures/'+ idFestival).put(file);
}else if(value===2){
    let uuid = UUID.UUID();
    uploadTask = this.storageRef.child('images/festival_news/'+ idFestival+'/'+uuid).put(file);
}
else if(value===3){
    let uuid = UUID.UUID();
    uploadTask = this.storageRef.child('images/general_news/'+uuid).put(file);
}

// Register three observers:
uploadTask.on('state_changed', function(snapshot){
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
    console.log("Upload is "+progress+"% done");
    switch(snapshot.state){
        case firebase.storage.TaskState.PAUSED:
            console.log("Upload is paused");
            break;
        case firebase.storage.TaskState.RUNNING:
            console.log("Upload is running");
            break;
    }
}, function(error) {
  // Handle unsuccessful uploads
    switch(error.name){
        case 'storage/unauthorized':
            console.log("User doesn't have permission to upload");
            break;
        case 'storage/canceled':
            console.log("User cancelled the upload");
            break;
        case 'storage/unknown':
            console.log("Unknown error ocurred");
            break;
    }
}, function() {
    // Handle successful uploads on complete
    if(value===0){
        that.userService.changeProfilePhoto(uploadTask.snapshot.downloadURL);
    }else if(value===1){
        that.festivalService.uploadMainPhoto(idFestival,uploadTask.snapshot.downloadURL);
    }else {
        that.downloadURL = uploadTask.snapshot.downloadURL;
    }
    that.done = true;
    });
}
}
