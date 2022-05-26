import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedDataModule } from 'src/shared/shared-data/shared-data.module';
import { ListIdeasComponent } from './modules/ideas/list-ideas/list-ideas.component';
import { AuthService } from './services/auth.service';
import { ProjectService } from './services/project.service';

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
  filterIdea:FormGroup
  constructor(private projectService:ProjectService,
     private formBuilder: FormBuilder,
     private shared: SharedDataModule,
     private router: Router,
     public authService: AuthService,
     private Ideas:ListIdeasComponent){
    this.logged = false;

  }
  options: any = this.shared.languageOptions
  title = 'TuCrowdfunding_Dev1';
  //userName = localStorage.setItem("userId","626fc476190e48a046598500");
  ngOnInit(): void {
    this.filterIdea=this.formBuilder.group({
      content: ['',Validators.required],
    })
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
  filter(){
    console.log(this.filterIdea);
    if(this.filterIdea.status=="VALID"){
    console.log("Filtrado")
    this.projectService.getFiltredIdeas(this.filterIdea.value['content']).then((data)=>{
      console.log(data);
      this.projectService.ideas=data
      this.projectService.ideaschange.next(this.projectService.ideas);


    })}
  }
}
