import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  ideaFormGroup: FormGroup;
  idea:any;
  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
    private projectService:ProjectService
  ) { }

  ngOnInit(): void {
    this.idea=JSON.parse(localStorage.getItem("idea")||"");


    this.ideaFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      projectDays: [0, Validators.min(0)],
      fundGoal: [0,  Validators.min(0)],
      category: ['', Validators.required],
  });
  }
  modify(e:any){

    this.idea.projectDays=parseInt(this.idea.projectDays)
    this.idea.fundGoal=parseInt(this.idea.fundGoal)


    var project=this.ideaFormGroup.value;
    project.id=this.idea.id
    this.projectService.editProject(this.idea)



  }
  goback(){
    this.location.back();
  }
}
