import { Component, OnInit, Input } from '@angular/core';
import { AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'blog-festival',
  templateUrl: './blog-festival.component.html',
  styleUrls: ['./festival.component.css']
})
export class BlogFestivalComponent {
  @Input() idFestival:string;
  noticias: FirebaseListObservable<any>;
  more: string;

   constructor(
     private af: AngularFire
   ){}
   ngOnInit(){
     this.noticias = this.af.database.list('FESTIVALERS/noticias/festivales/'+this.idFestival);
   }
}