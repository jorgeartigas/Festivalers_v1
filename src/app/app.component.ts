import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   constructor(
    private userService: UserService,
    private router: ActivatedRoute
  ){}


}
