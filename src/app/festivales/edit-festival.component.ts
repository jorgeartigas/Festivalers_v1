import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { CurrentUserData } from '../services/user-data.service';
import { FestivalService } from '../services/festival.service';
import { StorageService } from '../services/storage.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Location } from '@angular/common';
import { Festival } from './festival';

@Component({
  selector: 'edit-festival',
  templateUrl: './edit-festival.component.html',
  styleUrls: ['./festival.component.css']
})
export class EditFestivalComponent implements OnInit {
    festival = new Festival ('','','','','','','','','','',[],true,'',Date.now());
    idFestival: string;
    activeView: string;
    editado:boolean = false;

    constructor(
        public festivalService: FestivalService,
        public userData: CurrentUserData,
        public route: ActivatedRoute,
        public router: Router,
        public af: AngularFire,
        public storageService: StorageService,
        private location: Location

    ){}
    ngOnInit(){
        this.route.params.first().subscribe(params => {
            this.idFestival = params['id'];
            this.af.database.object('FESTIVALERS/festivales/'+this.idFestival).first().subscribe(festival => {
                this.festival=festival;
            });
        });
    }
    activateView(val?:string){
        this.activeView = val;
    }
    updateFestival(){
        this.af.database.object('FESTIVALERS/festivales/'+this.idFestival).update(this.festival);
        this.editado = false;
    }
    upload(file){
        if(file){
            this.storageService.upload(file.target.files[0],1,this.idFestival);
        }
    }
    cancel(){
        this.location.back();
    }
}
