import { Component, OnInit,Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnInit {

  public routea: string;
  
@Input() idea:any;
  constructor(private router: Router,private route: ActivatedRoute) { this.routea=router.url  }

  ngOnInit(): void {
    console.log(this.route.parent);
    console.warn(this.idea);

  }
  editIdea(){
    localStorage.setItem('idea',JSON.stringify(this.idea));

    this.router.navigate(['modificar'], { relativeTo: this.route.parent });
  }
}
