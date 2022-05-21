import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import {Location} from '@angular/common';
import { IdeaDto } from 'src/shared/dtos/Idea.dto';
import { Editor,Toolbar } from 'ngx-editor';
@Component({
  selector: 'app-idea-register',
  templateUrl: './idea-register.component.html',
  styleUrls: ['./idea-register.component.css']
})
export class IdeaRegisterComponent implements OnInit {
  public stepNames = ["Definamos tu idea", "Cuentanos de tu idea", "Material de soporte"];
  public step = 1;
  editor: Editor;
  html: '';
  userid:any=localStorage.getItem('userId')
  ideaFormGroup: FormGroup[];
  idea:IdeaDto=new IdeaDto();


  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
    private projectService:ProjectService,

    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.editor = new Editor();


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

  goback(){
    this.router.navigate(['misideas'], { relativeTo: this.route.parent });
  }
  changePage(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var newDate = new Date(today.setMonth(today.getMonth()+2));
    var date2 = newDate.getFullYear()+'-'+(newDate.getMonth()+1)+'-'+newDate.getDate();

    this.idea.title= this.ideaFormGroup[0].value.title;
    this.idea.isComplete= false;
    this.idea.description= this.ideaFormGroup[1].value.description;
    this.idea.objective= this.ideaFormGroup[0].value.about;
    this.idea.creationDate= date;
    this.idea.deadline= date2;
    this.idea.video= this.ideaFormGroup[2].value.videoLink;
    this.idea.pdf= this.ideaFormGroup[2].value.pdf;
    this.idea.fundGoal= parseInt(this.ideaFormGroup[0].value.fundGoal);
    this.idea.category= this.ideaFormGroup[0].value.category;
    this.idea.status=0;
    this.idea.backers= 0;
    this.idea.fundsCollected= 0;
    this.idea.entrepreneur= this.userid;
    this.idea.donations= []
    this.projectService.createProject(this.idea);



}
}

