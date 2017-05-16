import { Injectable } from '@angular/core';

@Injectable()
export class CurrentUserData{
    isLoggedIn: boolean;
    userUID: string;
    currentUser: any;
    constructor() {}
}