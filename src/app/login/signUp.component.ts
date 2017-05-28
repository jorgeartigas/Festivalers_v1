import { Component, OnInit} from '@angular/core';
import { LoginService } from '../services/login.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { User } from '../profile/User';

@Component({
  selector: 'signUp',
  templateUrl: 'signUp.component.html',
  styleUrls: [ './signUp.component.css' ]
})
export class SignUpComponent implements OnInit{
  newUser = new User ('','','','',[],'../../assets/no-image-user.png',[],[],[],[],[],[],false,Date.now());
  email:string;
  password:string;
  styles: FirebaseListObservable<any>;
  countries: FirebaseListObservable<any>;
  months: FirebaseListObservable<any>;

  constructor(
    private loginService: LoginService,
    private af: AngularFire
    ){}
  ngOnInit(){
    this.styles = this.af.database.list('FESTIVALERS/camposBD/estilos');
    this.countries = this.af.database.list('FESTIVALERS/camposBD/paises');
  }
  signUp(signUpData){
    this.loginService.signUp(signUpData,this.newUser);
  }

  getBackground() {
  let backgroundImage = {
      'background-image': 'url(\'../../assets/bg.png\')',
      'background-repeat': 'no-repeat',
      'background-size': 'cover',
      'background-position': 'center center',
      'height': '600px'
  };
  return backgroundImage;
}
}
