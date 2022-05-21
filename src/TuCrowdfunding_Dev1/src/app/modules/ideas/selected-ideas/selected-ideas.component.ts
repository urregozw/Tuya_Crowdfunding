import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { StringDecoder } from 'string_decoder';
import { Chart } from 'chart.js';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-selected-ideas',
  templateUrl: './selected-ideas.component.html',
  styleUrls: ['./selected-ideas.component.css']
})
export class SelectedIdeasComponent implements OnInit {
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
  getfavs(){
    this.userService.getFavProjects().then((data)=>{
      data.subscribe((data)=>{console.log(data['projectOfInterest']);
      this.favorites=data['projectOfInterest']
      if (this.favorites.includes(this.idea.id)){
        this.icon="favorite"
      }
      })


    })

  }
  setFavs(){
    const request={
      "contributorId":this.user,
      "projectId":this.idea.id
      }
    this.icon="favorite"
    this.userService.addToFavs(request)
    console.log(request);

  }
  getIdea(){
    this.ideaService.getProjectById(this.id).subscribe((data)=>{
    this.idea=data


    this.getEntrepreneur()
    this.getDonations()
    this.getfavs()
    })
  }
  getEntrepreneur(){

    this.ideaService.getEntrepreneur(this.idea['entrepreneur']).subscribe((data)=>{
      this.entrepreneur=data;

    })
  }

  getDonations(){

  this.ideaService.getDonation(this.idea['id']).subscribe((data)=>{
    this.donators=data.reverse();
    data.forEach(element => {
      this.donations+=element.donatedFunds

    });


});

  }


  donateIdea(e:any){
    var request=
    {
      "donatedFunds": this.ideaFormGroup.value.amount,
      "date": "2022-05-02T10:16:57.584Z",
      "approved": true,
      "contributor": this.user ,
      "project": this.id
    }

     this.ideaService.donate(request).then((data)=>{
      alert("Donacion realizada con exito")
      window.location.reload()
    })


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


}
