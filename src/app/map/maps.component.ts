import { Component,OnInit,Input } from '@angular/core';
import { FestivalService } from '../services/festival.service';

@Component({
  selector: 'maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapComponent implements OnInit {
  title: string = 'Trying maps';
  @Input() festival:any;
  lat: number;
  lng: number;
  searchString:string;
  constructor(public festivalService: FestivalService){}

  ngOnInit(){
    this.searchString=this.festival.name+", "+this.festival.address;
    this.festivalService.mapLocation(this.searchString).subscribe(val => {
      this.lat = val.results[0].geometry.location.lat;
      this.lng = val.results[0].geometry.location.lng;
    });
  }

}

