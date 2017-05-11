import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/filter';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {
  logged:boolean;
  userUid:string;
  userData: any;
  error: string;
  festivalesPendientes: FirebaseListObservable<any> = this.af.database.list('/FESTIVALERS/festivalesPendientes');
  festivales: FirebaseListObservable<any>=this.af.database.list('/FESTIVALERS/festivales');

  
  constructor(
    private router: Router,
    private af: AngularFire
  ) {}

login(loginData) {
  this.af.auth.login(loginData).then(user=>{
    this.router.navigate(['/home']);
    this.userUid = user.uid;
  }, error =>{  
     switch(error['code']){
        case 'auth/user-not-found':
            this.error = 'El email no existe';
            break;
        case 'auth/wrong-password':
            this.error = 'Contraseña incorrecta';
            break;
    }
  });
}

isLoggedIn(){
  this.af.auth.subscribe(user => {
    if(user){
      this.logged=true;
      this.userUid=user.uid;
      this.af.database.object('FESTIVALERS/Users/'+user.uid).first().subscribe(user =>{
      })
    }
    else{
      this.logged=false;
      this.userUid=null;
    }
  })
}

signUp(signUpData,newUser){
  this.af.auth.createUser(signUpData).then(regUser => { 
          this.router.navigate(['/login']);
          this.af.database.object('FESTIVALERS/Users/'+regUser.uid).set(newUser);
          // email de verificacion y verificar email
          //this.af.auth.getAuth().auth.sendEmailVerification();
          //console.log(this.af.auth.getAuth().auth.emailVerified);
        }).catch(
            (err) => {
            console.log(err);
            this.router.navigate(['/signUp']);
        })
    }
logout() {
  this.af.auth.filter((authState)=>!authState).first().subscribe(
    ()=>{
      this.userUid=null;
      this.router.navigate(['/home']);
    });
  this.af.auth.logout();
}
getUserData(){
  this.af.database.object('FESTIVALERS/Users/'+this.userUid).subscribe(user=>{
    this.userData=user;
  })
}
}
