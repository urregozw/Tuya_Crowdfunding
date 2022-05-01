import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnInit {
  router: string;
@Input() idea:any;
  constructor(private _router: Router,) { this.router = _router.url }

  ngOnInit(): void {
    console.warn(this.idea);

  }

}
