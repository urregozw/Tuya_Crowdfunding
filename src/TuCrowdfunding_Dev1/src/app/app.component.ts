import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataModule } from 'src/shared/shared-data/shared-data.module';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //public logged:boolean=this.loggedUser;
  private user:any="";
  logged: boolean;
  _asideSubscription: any;
  constructor(private shared: SharedDataModule,private router: Router,private authService: AuthService){
    this.logged = authService.logged
    this._asideSubscription = authService.loggedChange.subscribe((value) => {
        this.logged = value
    })
  }
  options: any = this.shared.languageOptions
  title = 'TuCrowdfunding_Dev1';
  userName = localStorage.setItem("userId","626fc476190e48a046598500");
  login(){
    this.router.navigate(['login'])

  }
  logOut(){
    this.authService.logout();

  }
  signin(){

  }
  ideas(){
    this.router.navigate(['ideas/misideas']);


  }
}
