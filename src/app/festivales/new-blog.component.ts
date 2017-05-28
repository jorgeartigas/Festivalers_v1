import { Component, Input, OnInit } from '@angular/core';
import { Noticia } from './noticia';
import { AngularFire, FirebaseListObservable} from 'angularfire2';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./festival.component.css']
})
export class BlogComponent implements OnInit{
  @Input() idFestival:string;
  noticia: Noticia = new Noticia("","","","",Date.now());
  activeView:string;
  noticias:FirebaseListObservable<any>;
  publicada: boolean = false;
    constructor(
      public af: AngularFire,
      private storageService: StorageService
    ){}
  ngOnInit(){
    console.log(this.storageService.done)
    this.noticias = this.af.database.list('FESTIVALERS/noticias/festivales/'+this.idFestival);
  }
  upload(file){
    if(file)
      this.storageService.upload(file.target.files[0],2,this.idFestival);
  }
  publish(){
    this.noticia.photo = this.storageService.downloadURL;
    this.noticia.published = Date.now();
    console.log(this.noticia)
    this.af.database.list('FESTIVALERS/noticias/festivales/'+this.idFestival).push(this.noticia).then(
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
