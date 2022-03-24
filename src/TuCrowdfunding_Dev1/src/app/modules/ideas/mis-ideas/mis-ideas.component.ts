import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
@Component({
  selector: 'app-mis-ideas',
  templateUrl: './mis-ideas.component.html',
  styleUrls: ['./mis-ideas.component.css']
})
export class MisIdeasComponent implements OnInit {
  public hasideas:boolean=true;
  public ideas:any[];
  constructor(
    
    private router: Router,
    private route: ActivatedRoute,
    private projectService:ProjectService
  ) { }

   ngOnInit() {
    console.log(this.route.parent);
    this.projectService.getProjectsbyUser().then((data)=>{console.log(data);
    data.subscribe((ideas)=>{
      this.ideas=ideas
    });
    })
    console.log(this.ideas);
    
    
    
    
  }
  ideaRegister(){
    this.router.navigate(['registraridea'], { relativeTo: this.route.parent });
  }
  //, { relativeTo: this.route }
}
