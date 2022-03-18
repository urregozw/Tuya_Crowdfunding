import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-idea-register',
  templateUrl: './idea-register.component.html',
  styleUrls: ['./idea-register.component.css']
})
export class IdeaRegisterComponent implements OnInit {
 
  
  constructor(
    private formBuilder: FormBuilder
  ) { }

  
  ngOnInit() {
  }
 
}
