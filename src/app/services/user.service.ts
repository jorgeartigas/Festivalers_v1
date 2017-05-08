import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { HomePageComponent } from '../home/homePage.component';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {
  logged:boolean;
  userUid:string;
  userData: any;
  sub:any;
  festivalesPendientes: FirebaseListObservable<any> = this.af.database.list('/FESTIVALERS/festivalesPendientes');
  festivales: FirebaseListObservable<any>=this.af.database.list('/FESTIVALERS/festivales');

  
  constructor(
    private router: Router,
    private af: AngularFire
  ) {}
login(username,password) {
  this.af.auth.login({email: username, password: password}).then(user=>{
    this.router.navigate(['/home']);
    this.userUid = user.uid;
  });
}
isLoggedIn(){
      this.af.auth.subscribe(user => {
      if(user){
        this.logged=true;
        this.userUid=user.uid;
      }
      else{
        this.logged=false;
        this.userUid=null;
      }
    })
}
signUp(email,password,userName,lastName,age,city){
  this.af.auth.createUser({email: email,password: password}).then(regUser => { 
          this.router.navigate(['/login']);
          var userInfo = {
              name: userName,
              lastname: lastName,
              age: age,
              city: city
          }
          this.af.database.object('FESTIVALERS/Users/'+regUser.uid).set(userInfo);
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
  this.sub = this.af.database.object('FESTIVALERS/Users/'+this.userUid);
  this.sub.subscribe(user=>{
    this.userData=user;
  })
}
addFestival(festivalName: String,estilo:String,mes:String,pais:String,description: String,mainImage:String,festivalStartDate:String,festivalEndDate:String) { 
  if (!festivalName||!estilo||!description||!mainImage||!festivalStartDate||!festivalEndDate) { return; } 
    this.festivalesPendientes.push({ name: festivalName,estilo: estilo,mes: mes,pais: pais,description: description,mainImage: mainImage,startDate:festivalStartDate,endDate: festivalEndDate});
  }
validateFestival(festival: any){
    this.festivales.push(festival).then(()=> this.festivalesPendientes.remove(festival));
  }
discardFestival(festival: any){
   this.festivalesPendientes.remove(festival); 
}
}
