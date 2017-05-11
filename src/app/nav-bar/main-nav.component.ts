import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
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
