import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { CurrentUserData } from './user-data.service';

@Injectable()
export class UserService {
  constructor(
    public userData: CurrentUserData
  ) {}
}
