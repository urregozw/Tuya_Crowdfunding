import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataModule } from 'src/shared/shared-data/shared-data.module';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  public logged:boolean=false
  private user:any="";
  constructor(private shared: SharedDataModule,private router: Router){}
  options: any = this.shared.languageOptions
  ngOnInit(): void {
  }
  
  login(){
    this.logged=true
  }
  signin(){
    
  }
  ideas(){
    this.router.navigate(['ideas/misideas']);
 
    
  }
}
