import { Injectable } from '@angular/core';
import { User } from '../model/user.class';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  loggedInUser: User = null;

  constructor(private router: Router) { 
  }

  Admin(): boolean { 
    return (this.loggedInUser == null) ? false : this.loggedInUser.Admin;
  }
  Reviewer(): boolean { 
    return (this.loggedInUser == null) ? false : this.loggedInUser.Reviewer;
  }

  checkLogin(): void {
    // if user is not logged in, send to login page
    // commenting out for testing purposes
    // if(this.loggedInUser == null) {
    //   this.router.navigateByUrl("/users/login");
    // }
  }
}
