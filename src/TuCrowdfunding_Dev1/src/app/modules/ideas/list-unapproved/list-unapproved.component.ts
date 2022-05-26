import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-list-unapproved',
  templateUrl: './list-unapproved.component.html',
  styleUrls: ['./list-unapproved.component.css']
})
export class ListUnapprovedComponent implements OnInit {
  proyectos:any
  entrepreneur:any
  constructor(private projectService:ProjectService,private router:Router) { }

  ngOnInit(): void {
    this.projectService.getUnapproved().then((data)=>{
      data.subscribe((ideas)=>{

        this.proyectos=ideas
      });
    })
  }
  seeIdea(idea){
    localStorage.setItem('IDidea',idea.id)
    this.router.navigate(['ideas/preview'])
  }
  videoId(idea){
    console.log(idea);

    var url=idea.video
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      console.log(match[2]);

      return match[2]
    } else {
      //error
    }
  }
  getEntrepreneur(idea){

    this.projectService.getEntrepreneur(idea['entrepreneur']).subscribe((data)=>{
      this.entrepreneur=data;


    })
  }
}
