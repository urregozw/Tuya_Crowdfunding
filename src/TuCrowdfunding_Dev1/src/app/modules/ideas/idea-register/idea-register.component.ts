import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-idea-register',
  templateUrl: './idea-register.component.html',
  styleUrls: ['./idea-register.component.css']
})
export class IdeaRegisterComponent implements OnInit {
  userid:any=localStorage.getItem('userId')
  ideaFormGroup: FormGroup;
  idea:any;
  constructor(
    private location: Location,
    private formBuilder: FormBuilder, 
    private router: Router,
    private projectService:ProjectService,
    
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.idea ={
      title: '',
      description: '',
      projectDays: 0,
      fundGoal: 0,
      category: '',
      entrepreneur:this.userid
  };
    console.log(this.idea);

    this.ideaFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      projectDays: [0, Validators.min(0)],
      fundGoal: [0,  Validators.min(0)],
      category: ['', Validators.required],
  });
  }
  modify(e:any){
    console.log(e);
    console.log(this.ideaFormGroup.value);
    this.idea.projectDays=parseInt(this.idea.projectDays)
    this.idea.fundGoal=parseInt(this.idea.fundGoal)
    console.log(this.idea);
    
    var project=this.ideaFormGroup.value;
    project.id=this.idea.id
    console.warn(project); 
    this.projectService.createProject(this.idea)
    
    
    
  }
  goback(){
    this.router.navigate(['misideas'], { relativeTo: this.route.parent });
  }
}


