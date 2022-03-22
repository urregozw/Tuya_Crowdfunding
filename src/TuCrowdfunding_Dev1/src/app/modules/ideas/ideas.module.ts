import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdeasRoutingModule } from './ideas-routing.module';
import { MisIdeasComponent } from './mis-ideas/mis-ideas.component';
import { IdeaRegisterComponent } from './idea-register/idea-register.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatSelectModule} from '@angular/material/select'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatStepperModule} from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MisIdeasComponent,
    IdeaRegisterComponent
  ],
  imports: [
    CommonModule,
    IdeasRoutingModule,
    MatAutocompleteModule, 
    MatButtonModule, 
    MatCheckboxModule, 
    MatFormFieldModule, 
    MatIconModule, 
    MatInputModule,
    MatSelectModule, 
    MatToolbarModule,
    MatStepperModule,
    MatStepperModule, MatInputModule, MatButtonModule
  ]
})
export class IdeasModule { }