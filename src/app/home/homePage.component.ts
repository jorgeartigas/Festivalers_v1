import { Component,OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
@Component({
  selector: 'homePage',
  templateUrl: './homePage.component.html',
  styleUrls: ['./homePage.component.css']
})
export class HomePageComponent implements OnInit{
  noticias:FirebaseListObservable<any>;
  constructor(
    private af: AngularFire
  ){}

  ngOnInit(){
    this.af.database.list('FESTIVALERS/noticias/generales', {
          query: {
            limitToLast: 3
          }
    }).first().subscribe(snap => this.noticias=snap.reverse());
  }
}
