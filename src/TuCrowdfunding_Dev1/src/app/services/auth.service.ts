import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";

import { User } from "src/shared/dtos/user.dto";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logged:boolean=false;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  loggedChange: Subject<boolean> = new Subject<boolean>();
  constructor(private httpClient: HttpClient,private router:Router) {

  }

  login(request):Promise<any> {


    return new Promise((resolve, reject) => {

      this.httpClient.post<any>((environment.back + 'api/Auth'), request, { headers: { 'Content-Type': 'application/json;odata=verbose' } }).subscribe((data) => {

        if (data != "El usuario no Existe") {
          localStorage.setItem('userId',data)
          this.logged=true
          this.loggedChange.next(this.logged);
          resolve(data)
        }
        else {
          reject('No existe')
        }

      }
      )




    })


  }

  logout() {
    // remove user from local storage to log user out
    this.logged=false;
    this.loggedChange.next(this.logged);
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    this.router.navigate(['ideas/proyectos'])
    //this.currentUserSubject.next(null);
  }
}
