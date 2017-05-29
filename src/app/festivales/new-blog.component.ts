import { Component, Input, OnInit } from '@angular/core';
import { Noticia } from './noticia';
import { AngularFire, FirebaseListObservable} from 'angularfire2';
import { StorageService } from '../services/storage.service';
import { FestivalService } from '../services/festival.service';

@Component({
  selector: 'new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css']
})
export class BlogComponent implements OnInit{
  @Input() idFestival:string;
  noticia: Noticia = new Noticia("","","","",Date.now());
  activeView:string;
  noticias:FirebaseListObservable<any>;
  publicada: boolean = false;
  idNoticia:string;
  noticiaEdit: Noticia = new Noticia("","","","",Date.now());
  editando: boolean = false;
  new: boolean = false;
    constructor(
      public af: AngularFire,
      public storageService: StorageService,
      public festivalService: FestivalService
    ){}
  ngOnInit(){
    this.noticias = this.af.database.list('FESTIVALERS/noticias/festivales/'+this.idFestival);
  }
  upload(file){
    if(file){
      this.storageService.upload(file.target.files[0],2,this.idFestival);
      this.new=true;
    }
  }
  reset(){
    this.noticia.contenido = '';
    this.noticia.entradilla = '';
    this.noticia.photo = '';
    this.noticia.titulo ='';
    this.noticia.published ='';
  }
  delete(id){
    this.af.database.object('FESTIVALERS/noticias/festivales/'+this.idFestival+'/'+id).remove();
  }
  publish(){
    this.noticia.photo = this.storageService.downloadURL;
    this.noticia.published = Date.now();
    this.af.database.list('FESTIVALERS/noticias/festivales/'+this.idFestival).push(this.noticia).then(
      ()=>{
        this.storageService.downloadURL = "";
        this.noticia.titulo="";
        this.noticia.entradilla="";
        this.noticia.contenido="";
        this.noticia.photo="";
        this.publicada = true;
        this.festivalService.createNotification(this.idFestival);
      }
    )
  }
  updateNew(){
      this.noticiaEdit.photo = this.storageService.downloadURL;
      this.af.database.object('FESTIVALERS/noticias/festivales/'+this.idFestival+'/'+this.idNoticia).update(this.noticiaEdit).then(
        ()=> this.storageService.downloadURL="");
  }
}
