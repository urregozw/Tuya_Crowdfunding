import { Component, OnInit,Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import {DomSanitizer} from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnInit {
  public icon="favorite_border"
  public routea: string;
  public entrepreneur:any;
  public video="https://v2.kickstarter.com/1651456427-fXsWTrIib1rQe2RCAkqX%2BFcF2RMnDjcrFpGRm6ipsYM%3D/projects/4226746/video-1158799-h264_high.mp4"
  public user=localStorage.getItem('userId')
@Input() idea:any;
@Input() favorites:any;
  constructor(private router: Router,private route: ActivatedRoute,private ideaService:ProjectService,private sanitazer:DomSanitizer,private userService:UserService) { this.routea=router.url  }

  ngOnInit(): void {


    this.getEntrepreneur()
    this.getfavs()

    }
  editIdea(){
    localStorage.setItem('idea',JSON.stringify(this.idea));

    this.router.navigate(['modificar'], { relativeTo: this.route.parent });
  }
  getfavs(){
    console.log(this.favorites)
    if (this.favorites.includes(this.idea.id)){
      this.icon="favorite"
    }
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
  getEntrepreneur(){

    this.ideaService.getEntrepreneur(this.idea['entrepreneur']).subscribe((data)=>{
      this.entrepreneur=data;


    })
  }
  photoURL() {
    return this.sanitazer.bypassSecurityTrustUrl(this.video);
  }


  seeIdea(){
    localStorage.setItem('IDidea',this.idea.id);

    this.router.navigate([this.idea.title], { relativeTo: this.route.parent });

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
