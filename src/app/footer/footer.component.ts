import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router
  ){}
  ngOnInit(){
  this.userService.isLoggedIn();
}
  logout(){
    this.userService.logout();
  }
}
