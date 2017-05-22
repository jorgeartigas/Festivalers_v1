import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { CurrentUserData } from '../services/user-data.service';
import { FestivalService } from '../services/festival.service';
import { StorageService } from '../services/storage.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Festival } from './festival';

@Component({
  selector: 'edit-festival',
  templateUrl: './edit-festival.component.html',
  styleUrls: ['./edit-festival.component.css']
})
export class EditFestivalComponent implements OnInit {
    festival = new Festival ('','','','','','','','','','',[],true,'',Date.now());
    idFestival: string;
    constructor(
        public festivalService: FestivalService,
        public userData: CurrentUserData,
        public route: ActivatedRoute,
        public router: Router,
        public af: AngularFire,
        public storageService: StorageService
    ){}
    ngOnInit(){
        this.route.params.first().subscribe(params => {
            this.idFestival = params['id'];
            this.af.database.object('FESTIVALERS/festivales/'+this.idFestival).first().subscribe(festival => {
                this.festival=festival;
            });
        });
    }
    updateFestival(){
        this.af.database.object('FESTIVALERS/festivales/'+this.idFestival).update(this.festival)
        .then(()=>this.router.navigate(['festival/'+this.idFestival]));
    }
    upload(file){
        if(file){
            this.storageService.upload(file.target.files[0],1,this.idFestival);
        }
     }
}
