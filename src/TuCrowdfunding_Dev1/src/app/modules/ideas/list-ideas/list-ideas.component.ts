import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-ideas',
  templateUrl: './list-ideas.component.html',
  styleUrls: ['./list-ideas.component.css']
})
export class ListIdeasComponent implements OnInit {
  public proyectos:any;
  public favorites:any;
  logged:boolean=false;
  ideas: any;
  _asideSubscription: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService:ProjectService,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this._asideSubscription = this.projectService.ideaschange.subscribe((value) => {
      this.proyectos = value

  })
    if(localStorage.getItem('userId')){
      this.logged=true
      this.userService.getFavProjects().then((data)=>{
        data.subscribe((data)=>{
        this.favorites=data['projectOfInterest']
        })


      })
    }

    this.projectService.getProjects().then((data)=>{
      data.subscribe((ideas)=>{

        this.proyectos=ideas
      });
    })

  }
  getFavs(){
    this.proyectos=[]
    this.favorites.forEach((element)=>{

    if (element!=''){

      this.projectService.getProjectById(element).subscribe((data)=>{
        this.proyectos.push(data)
        })
    }

  }
    )
  }
  type(type){
    this.projectService.getProjects().then((data)=>{
      data.subscribe((ideas)=>{

        if(type=="Todas"){
          this.proyectos=ideas
        }
        if (type=="Populares"){
          ideas.sort(function (a, b) {
            if (a.donations.length > b.donations.length) {
              return 1;
            }
            if (a.donations.length < b.donations.length) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });
          var populares=ideas.reverse()

          this.proyectos=populares.slice(0, 5)
        }
        if (type=="Nuevas"){
          ideas.reverse()
          this.proyectos=ideas.slice(0, 5)
        }
        if (type=="Completas"){
          var completedIdeas=ideas.filter((idea)=>{

           var percentage=(idea['fundsCollected']*100)/idea['fundGoal']
           if(percentage>60){
             return idea
           }
          })
          this.proyectos=completedIdeas
        }


      });
    })

  }
  sortObjectByKeys(o) {
    return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}


}
