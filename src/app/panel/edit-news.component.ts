import { Component,OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router,ActivatedRoute } from '@angular/router';
import { Noticia } from '../festivales/noticia';

@Component({
  selector: 'edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {
  idNoticia:string;
  noticias:any;
  noticia: Noticia = new Noticia("","","","",Date.now());
  publicada: boolean = false;
  editando: boolean = false;
    constructor(
        private af: AngularFire,
        private router: Router,
                public route: ActivatedRoute,
    ){}
    ngOnInit(){
        this.af.database.object('FESTIVALERS/noticias/generales/').first().subscribe(noticias =>{
          if(noticias[0]){
            this.noticias = noticias;
            console.log(this.noticias)
          }else{
            console.log('no hay')
          }
        })
    }
    update(){
      this.af.database.object('FESTIVALERS/noticias/generales/'+this.idNoticia).update(this.noticia);
    }
}
