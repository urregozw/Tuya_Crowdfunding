import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, ActivatedRoute} from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { StringDecoder } from 'string_decoder';
import { Chart } from 'chart.js';
import { UserService } from 'src/app/services/user.service';
import { IdeaTestDto } from 'src/shared/dtos/IdeaTest.dto';
import { ObjectMethod } from 'src/shared/ObjectMethod';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-selected-ideas',
  templateUrl: './selected-ideas.component.html',
  styleUrls: ['./selected-ideas.component.css']
})
export class SelectedIdeaByLinkComponent implements OnInit {
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
  public userId:any=localStorage.getItem('userId')
  ideaFormGroup: FormGroup;
  currentRoute: string;
  constructor(private router: Router,private route: ActivatedRoute,private ideaService:ProjectService,private sanitazer:DomSanitizer,
    private formBuilder: FormBuilder,    private userService:UserService,
    private chatService:ChatService,) {

     }

  ngOnInit(): void {


    var description=document.getElementById('#description')
    console.warn(this.router.url);
    this.route.params.subscribe(params => {
      console.log(params);


      this.ideaService.getFiltredIdeas(params['name']).then((data)=>{
        console.log(data);
        this.idea=data[0]
        localStorage.setItem('IDidea',data[0].id)
        this.router.navigate([`ideas/${params['name']}`])

      })
   });




  }

}
