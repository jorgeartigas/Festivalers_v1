import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  festivales: FirebaseListObservable<any>;
    constructor(
        private af: AngularFire,
        private router: Router
    ){
        this.festivales = this.af.database.list('/FESTIVALERS/festivales');
    }
    goTo(id){
        this.router.navigate(['festival/'+id]);
    }
}
