import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";

import { User } from "src/shared/dtos/user.dto";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logged:boolean=false;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  loggedChange: Subject<boolean> = new Subject<boolean>();
  constructor(private http: HttpClient) {

  }

  login(request) {
    console.log(request);

    //request
    this.logged=true;
    this.loggedChange.next(this.logged);

  }

  logout() {
    // remove user from local storage to log user out
    this.logged=false;
    this.loggedChange.next(this.logged);
    localStorage.removeItem("userId");
    //this.currentUserSubject.next(null);
  }
}
