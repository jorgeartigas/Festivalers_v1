import { Component, OnInit} from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { CurrentUserData } from '../services/user-data.service';
import { FestivalService } from '../services/festival.service';
import { Festival } from './festival';

@Component({
  selector: 'add-festival',
  templateUrl: './add-festival.component.html',
  styleUrls: ['./add-festival.component.css']
})
export class AddFestivalComponent implements OnInit {
    newFestival = new Festival ('','','','','','','','','','https://firebasestorage.googleapis.com/v0/b/festivalers-10001.appspot.com/o/images%2Ffestival_main_pictures%2Fno-img-festival.png?alt=media&token=5521f79c-08a6-4c12-9813-6fc05051040c',[],'','','','',true,'',Date.now());
    festivales: FirebaseListObservable<any>;
    styles: FirebaseListObservable<any>;
    countries: FirebaseListObservable<any>;
    months: FirebaseListObservable<any>;
    constructor(
        private af: AngularFire,
        private festivalService: FestivalService,
        private userData: CurrentUserData
    ){
        this.festivales = this.af.database.list('/festivales');
    }
    ngOnInit(){
        this.styles = this.af.database.list('FESTIVALERS/camposBD/estilos');
        this.countries = this.af.database.list('FESTIVALERS/camposBD/paises');
        this.months = this.af.database.list('FESTIVALERS/camposBD/meses');
    }
    addFestival(){
        this.newFestival.owner = this.userData.userUID;
        this.festivalService.addFestival(this.newFestival);
    }
    
    getBackground() {
        let backgroundImage = {
        'background-image': 'url(\'../../assets/umfmiami.jpg\')',
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
        'background-position': 'center center',
        'height': '600px'
        };

        return backgroundImage;
    }
}

