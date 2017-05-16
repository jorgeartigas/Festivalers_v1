import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'buscador',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class BuscadorComponent{
  results: FirebaseListObservable<any[]>;
  showResults: boolean;

  constructor(public af: AngularFire){
    this.results = this.af.database.list('FESTIVALERS/festivales');
  }

  showResultsFunction(){
    this.showResults = true;
  }
  filter(results,style) : boolean{
      if (results.style !== style){
          return true;
      }
      return false;
    }
}