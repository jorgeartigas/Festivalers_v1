import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { Noticia } from '../festivales/noticia';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent {
    noticia: Noticia = new Noticia("","","","",Date.now());
    publicada: boolean = false;
    constructor(
        private af: AngularFire,
        private router: Router,
        private storageService: StorageService,
    ){}
  upload(file){ 
    if(file)
      this.storageService.upload(file.target.files[0],3);
  }
  publish(){
    this.noticia.photo = this.storageService.downloadURL;
    this.noticia.published = Date.now();
    console.log(this.noticia)
    this.af.database.list('FESTIVALERS/noticias/generales/').push(this.noticia).then(
      ()=>{
        this.storageService.downloadURL = "";
        this.noticia.titulo="";
        this.noticia.entradilla="";
        this.noticia.contenido="";
        this.noticia.photo="";
        this.publicada = true;
      }
    )
  }
}
