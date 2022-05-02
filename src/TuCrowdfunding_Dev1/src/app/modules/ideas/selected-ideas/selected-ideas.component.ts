import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { StringDecoder } from 'string_decoder';

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
  ideaFormGroup: FormGroup;
  constructor(private router: Router,private route: ActivatedRoute,private ideaService:ProjectService,private sanitazer:DomSanitizer,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.id= localStorage.getItem('IDidea');
    this.user= localStorage.getItem('userId');
    this.getIdea()
    this.ideaFormGroup = this.formBuilder.group({
      amount: [0, Validators.required],
  });


  }
  getIdea(){
    this.ideaService.getProjectById(this.id).subscribe((data)=>{//console.log(data);
    this.idea=data
    this.getEntrepreneur()
    this.getDonations()
    })
  }
  getEntrepreneur(){
    console.warn(this.idea);
    this.ideaService.getEntrepreneur(this.idea['entrepreneur']).subscribe((data)=>{
      this.entrepreneur=data;      
    })
  }

  getDonations(){

  this.ideaService.getDonation(this.idea['id']).subscribe((data)=>{
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
    console.log(request);
     this.ideaService.donate(request).then((data)=>{console.log(data);
      alert("Donacion realizada con exito")
      window.location.reload()
    })
    
    
  }


} 
