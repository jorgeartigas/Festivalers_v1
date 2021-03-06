﻿import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { UserService } from '../services/user.service';

@Component({
  selector: 'search-festival',
  templateUrl: './search-festival.component.html',
  styleUrls: ['./search-festival.component.css']
})
export class SearchFestivalComponent implements OnInit{  
  styles: FirebaseListObservable<any>;
  countries: FirebaseListObservable<any>;
  months: FirebaseListObservable<any>;
  style = '';
  month = '';
  location = '';
  
  constructor(
      public af: AngularFire,
      public userService: UserService
  ){}
  ngOnInit(){
    this.userService.getFestivals();
    this.styles = this.af.database.list('FESTIVALERS/camposBD/estilos');
    this.countries = this.af.database.list('FESTIVALERS/camposBD/paises');
    this.months = this.af.database.list('FESTIVALERS/camposBD/meses');
  }
  search(){
    this.userService.searchFestival(this.style,this.month,this.location);
    console.log(this.userService.results.length)
  }
}