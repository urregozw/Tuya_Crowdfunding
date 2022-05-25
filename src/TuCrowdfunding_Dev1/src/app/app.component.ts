import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataModule } from 'src/shared/shared-data/shared-data.module';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //public logged:boolean=this.authService.logged;
  public isCollapsed = true;
  user=localStorage.getItem('userId')
  logged: boolean;
  _asideSubscription: any;
  constructor(private shared: SharedDataModule,private router: Router,public authService: AuthService){
    this.logged = false;

  }
  options: any = this.shared.languageOptions
  title = 'TuCrowdfunding_Dev1';
  //userName = localStorage.setItem("userId","626fc476190e48a046598500");
  ngOnInit(): void {
      this._asideSubscription = this.authService.loggedChange.subscribe((value) => {
          this.logged = value

      })
      if(this.user){
        this.logged = true
      }

  }
  login(){
    this.isCollapsed=true
    this.router.navigate(['login'])

  }
  logOut(){
    this.isCollapsed=true
    this.authService.logout();

  }
  signin(){
    this.isCollapsed=true
    this.router.navigate(['registry'])
  }
  profile(){
    this.isCollapsed=true
    this.router.navigate(['user/profile']);


  }
}
