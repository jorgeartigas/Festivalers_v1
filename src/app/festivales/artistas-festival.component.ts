import { Component, OnInit, Input } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'artistas-festival',
  templateUrl: './artistas-festival.component.html',
  styleUrls: ['./festival.component.css']
})
export class ArtistasFestivalComponent {
  @Input() idFestival: string;
  headLiners: any;
  general: any;
   constructor(
     private af: AngularFire
   ){}
  
  ngOnInit(){
    this.af.database.list('FESTIVALERS/FestivalsArtists/'+this.idFestival+'/headLiner').subscribe(artists => {
      this.headLiners = artists;
    })
    this.af.database.list('FESTIVALERS/FestivalsArtists/'+this.idFestival+'/general').subscribe(artists => {
      this.general = artists;
    })
  }
}