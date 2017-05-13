import { Component, Input } from '@angular/core';

@Component({
  selector: 'profileFestivals',
  templateUrl: './profile-festivals.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileFestivalsComponent {
    @Input() userUid: string;
    constructor(){}
}