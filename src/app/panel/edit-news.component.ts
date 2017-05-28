import { Component,OnInit,OnDestroy } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router,ActivatedRoute } from '@angular/router';
import { Noticia } from '../festivales/noticia';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit,OnDestroy{
  idNoticia:string;
  noticias:FirebaseListObservable<any>;
  noticiaEdit: Noticia = new Noticia("","","","",Date.now());
  publicada: boolean = false;
  editado:boolean=false;
  editando: boolean = false;
  new:boolean = false;
    constructor(
        private af: AngularFire,
        private router: Router,
        public route: ActivatedRoute,
        private storageService: StorageService
    ){}
    ngOnInit(){
        this.noticias = this.af.database.list('FESTIVALERS/noticias/generales/');
    }
    upload(file){
      if(file){
        this.storageService.upload(file.target.files[0],3);
        this.new=true;
        this.editado=true;
      }
    }
    updateNew(){
      if(this.storageService.downloadURL){
              this.noticiaEdit.photo = this.storageService.downloadURL;
      }
      this.af.database.object('FESTIVALERS/noticias/generales/'+this.idNoticia).update(this.noticiaEdit);
      this.editado=false;
      this.new=false;
      this.editando=false;
      this.publicada=true;
    }
    delete(id){
      this.af.database.object('FESTIVALERS/noticias/generales/'+id).remove();
    }
    ngOnDestroy(){
      this.storageService.downloadURL = '';
    }
}
