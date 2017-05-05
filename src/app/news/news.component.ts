import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  festivales: FirebaseListObservable<any>;
    constructor(
        private af: AngularFire
    ){
        this.festivales = this.af.database.list('/FESTIVALERS/festivales');
    }
}
