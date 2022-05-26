import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { IdeaTestDto } from 'src/shared/dtos/IdeaTest.dto';
import { ObjectMethod } from 'src/shared/ObjectMethod';
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
    private projectService:ProjectService,
  ) { }

   ngOnInit() {

    this.projectService.getProjectsbyUser().then((data)=>{
    data.subscribe((ideas)=>{
      this.ideas=ideas

    });
    })





  }
  ideaRegister(){
    this.router.navigate(['registraridea'], { relativeTo: this.route.parent });
  }
  //, { relativeTo: this.route }
}
