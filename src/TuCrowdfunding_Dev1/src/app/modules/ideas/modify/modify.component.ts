import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import {Location} from '@angular/common';
import { Editor } from 'ngx-editor';
import { IdeaDto } from 'src/shared/dtos/Idea.dto';
@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {
  ideaFormGroup: FormGroup[];
  idea:IdeaDto;
  public stepNames = ["Definamos tu idea", "Cuentanos de tu idea", "Material de soporte"];
  public step = 1;
  editor: Editor;
  html:any;
  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
    private projectService:ProjectService,

    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.editor = new Editor();

    this.idea=JSON.parse(localStorage.getItem("idea")||"");

    this.html=this.idea.description
    this.ideaFormGroup =
    [
    this.formBuilder.group({
      title: ['', Validators.required],
      about: ['', Validators.required],
      fundGoal: [0,  Validators.min(0)],
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
    }),
    this.formBuilder.group({
      description: ['', Validators.required],
    }),
    this.formBuilder.group({
      pdf: ['', Validators.required],
      videoLink: ['', Validators.required],
    }),

  ];
  }

  public changeStep(event: any) {

    this.step = event.selectedIndex + 1;
  }
  changePage(){


}
  modify(){

    this.idea.title= this.ideaFormGroup[0].value.title;
    this.idea.description= this.ideaFormGroup[1].value.description;
    this.idea.objective= this.ideaFormGroup[0].value.about;
    this.idea.video= this.ideaFormGroup[2].value.videoLink;
    this.idea.pdf= this.ideaFormGroup[2].value.pdf;
    this.idea.category= this.ideaFormGroup[0].value.category;
    this.projectService.editProject(this.idea)

  }
  goback(){
    this.router.navigate(['misideas'], { relativeTo: this.route.parent });
  }
}
