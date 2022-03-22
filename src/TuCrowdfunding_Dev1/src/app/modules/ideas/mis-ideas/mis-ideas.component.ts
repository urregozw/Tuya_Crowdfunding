import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-mis-ideas',
  templateUrl: './mis-ideas.component.html',
  styleUrls: ['./mis-ideas.component.css']
})
export class MisIdeasComponent implements OnInit {
  public ideas:boolean=false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    console.log(this.route.parent);
    
  }
  ideaRegister(){
    this.router.navigate(['registraridea'], { relativeTo: this.route.parent });
  }
  //, { relativeTo: this.route }
}
