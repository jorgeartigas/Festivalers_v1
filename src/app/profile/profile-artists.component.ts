import { Component,Input } from '@angular/core';

@Component({
  selector: 'profileArtists',
  templateUrl: './profile-artists.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileArtistsComponent {
    @Input() userUid: string;
    constructor(){}

}