import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-list-ideas',
  templateUrl: './list-ideas.component.html',
  styleUrls: ['./list-ideas.component.css']
})
export class ListIdeasComponent implements OnInit {
  public proyectos:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService:ProjectService
  ) { }

  ngOnInit(): void {
    this.projectService.getProjects().then((data)=>{console.log(data);
      data.subscribe((ideas)=>{
        this.proyectos=ideas
      });
    })
  }

}
