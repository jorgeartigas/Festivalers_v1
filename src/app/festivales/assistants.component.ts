import { Component, Input } from '@angular/core';

@Component({
  selector: 'assistants-festival',
  templateUrl: './assistants.component.html',
  styleUrls: ['./festival.component.css']
})
export class AssistantsFestivalComponent {
  @Input() attendees:any;
   constructor(){}
}