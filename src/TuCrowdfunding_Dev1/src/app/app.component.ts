import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataModule } from 'src/shared/shared-data/shared-data.module';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public logged:boolean=false
  private user:any="";
  constructor(private shared: SharedDataModule,private router: Router){}
  options: any = this.shared.languageOptions
  title = 'TuCrowdfunding_Dev1';
  userName = localStorage.setItem("userId","626fc476190e48a046598500");
  login(){
    this.logged=true
  }
  signin(){
    
  }
  ideas(){
    this.router.navigate(['ideas/misideas']); 
 
    
  }
}
