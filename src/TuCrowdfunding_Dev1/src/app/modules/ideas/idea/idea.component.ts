import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnInit {
@Input() idea:any;
  constructor() { }

  ngOnInit(): void {
    console.warn(this.idea);
    
  }

}
