import { Component,OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  idNoticia:string;
  noticia: any;
    constructor(
        private af: AngularFire,
        private router: Router,
                public route: ActivatedRoute,
    ){}
    ngOnInit(){
      this.route.params.first().subscribe(params => {
            this.idNoticia = params['id'];
            this.af.database.object('FESTIVALERS/noticias/generales/'+this.idNoticia).first().subscribe(noticia =>{
              this.noticia = noticia;
            })
      });
    }
}
