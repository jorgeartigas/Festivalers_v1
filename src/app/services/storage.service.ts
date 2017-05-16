import { Injectable } from '@angular/core';
import { AngularFire, FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';
import { CurrentUserData } from './user-data.service';

@Injectable()
export class StorageService {
private storage = firebase.storage();
private storageRef = this.storage.ref();
imgURL: string = null;

constructor(
    private af: AngularFire,
    public userData: CurrentUserData
    ) {}

upload(file,path){
// Upload file and metadata to the object 'images/mountains.jpg'
let uploadTask = this.storageRef.child('images/'+ path +'/'+ this.userData.currentUser.userUID).put(file);
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
  let downloadURL = uploadTask.snapshot.downloadURL;
  this.imgURL = downloadURL;
});
}
}
