import { Component, OnInit,Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnInit {

  public routea: string;
  public entrepreneur:any;
  public donations:number=0;
  public video="https://v2.kickstarter.com/1651456427-fXsWTrIib1rQe2RCAkqX%2BFcF2RMnDjcrFpGRm6ipsYM%3D/projects/4226746/video-1158799-h264_high.mp4"
@Input() idea:any;
  constructor(private router: Router,private route: ActivatedRoute,private ideaService:ProjectService,private sanitazer:DomSanitizer) { this.routea=router.url  }

  ngOnInit(): void {
    //console.log(this.route.parent);
    console.warn(this.idea);

    this.getEntrepreneur()
    this.getDonations()
    
    }
  editIdea(){
    localStorage.setItem('idea',JSON.stringify(this.idea));

    this.router.navigate(['modificar'], { relativeTo: this.route.parent });
  }
  getEntrepreneur(){
    console.warn(this.idea);
    this.ideaService.getEntrepreneur(this.idea['entrepreneur']).subscribe((data)=>{
      this.entrepreneur=data;
      //console.log(data);
      
    })
  }
  photoURL() {
    return this.sanitazer.bypassSecurityTrustUrl(this.video);
  }
  getDonations(){

  this.ideaService.getDonation(this.idea['id']).subscribe((data)=>{
    data.forEach(element => {
      this.donations+=element.donatedFunds
      
    });
  
  
});

  }

  seeIdea(){
    localStorage.setItem('IDidea',this.idea.id);
    console.log("si");
    this.router.navigate([this.idea.title], { relativeTo: this.route.parent });
    
  }

}
