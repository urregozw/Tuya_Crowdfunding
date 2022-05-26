import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { StringDecoder } from 'string_decoder';
import { Chart } from 'chart.js';
import { UserService } from 'src/app/services/user.service';
import { IdeaTestDto } from 'src/shared/dtos/IdeaTest.dto';
import { ObjectMethod } from 'src/shared/ObjectMethod';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  public id:any
  public idea:any;
  public routea: string;
  public entrepreneur:any;
  public donations:number=0;
  public user:any;
  public amounts:any
  public sect="proyecto";
  public donators:any;
  public icon="favorite_border";
  public favorites:any;
  public userAI:boolean=false;
  public succesRate:any;
  public userType:any=localStorage.getItem('userType')
  public isAdmin:boolean=false;
  ideaFormGroup: FormGroup;
  constructor(private router: Router,private route: ActivatedRoute,private ideaService:ProjectService,private sanitazer:DomSanitizer,
    private formBuilder: FormBuilder,    private userService:UserService) { }

  ngOnInit(): void {
    var description=document.getElementById('#description')


    this.id= localStorage.getItem('IDidea');
    this.user= localStorage.getItem('userId');

    this.getIdea()

    this.ideaFormGroup = this.formBuilder.group({
      amount: [0, Validators.required],
  });



  }

  getIdea(){
    this.ideaService.getProjectById(this.id).subscribe((data)=>{
    this.idea=data
    console.log(this.user);
    console.log(data.entrepreneur);

    if(this.user==data.entrepreneur || this.user=='628d8ebc276aa484b7503aad'){
      console.log("usuario");
      if(this.user=='628d8ebc276aa484b7503aad'){
        this.isAdmin=true
      }
      else{
        this.isAdmin=false
      }
    }
    else{
      console.log("redirect");

    }
    console.log(data);

    this.getEntrepreneur()
    this.getDonations()
    })
  }
  getEntrepreneur(){

    this.ideaService.getEntrepreneur(this.idea['entrepreneur']).subscribe((data)=>{
      this.entrepreneur=data;

    })
  }

  getDonations(){

  this.ideaService.getDonation(this.idea['id']).subscribe((data)=>{



    data.forEach(element => {
      this.donations+=element.donatedFunds

      this.userService.getContributor(element.contributor).subscribe((donator)=>{

        element['contributorName']=donator.name



      }
      )
    });
    this.donators=data.reverse();

});

  }


  donateIdea(e:any){

  }
  changeSect(e){
    this.sect=e

  }
  videoId(){
    var url=this.idea.video
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2]
    } else {
      //error
    }
  }

  aprobarIdea(){
    this.idea['status']=1
    console.log(this.idea);
    this.ideaService.editProject(this.idea).then((data)=>{
      alert("Idea aprobada")
      this.router.navigate(['ideas/pending'])
    })

  }
}
