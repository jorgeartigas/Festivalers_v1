import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { CurrentUserData } from './user-data.service';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/filter';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoginService {
  error: string;

  constructor(
    private router: Router,
    private af: AngularFire,
    public userData: CurrentUserData
  ) {}

login(loginData) {
  this.af.auth.login(loginData).then(user=>{
      this.router.navigate(['/home']);
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

signUp(signUpData,newUser){
  this.af.auth.createUser(signUpData).then(regUser => {  
          this.af.database.object('FESTIVALERS/Users/'+regUser.uid).set(newUser);
          this.router.navigate(['/login']);
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
      this.userData.userUID = null;
      this.userData.isLoggedIn = false;
      this.userData.currentUser = null;
      this.router.navigate(['/home']);
    });
  this.af.auth.logout();
}
}
