import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatSelectModule} from '@angular/material/select'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatAutocompleteModule}from '@angular/material/autocomplete'
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'
import {SharedDataModule} from '../shared/shared-data/shared-data.module';
import { BannerComponent } from './modules/presets/banner/banner.component';
import { FooterComponent } from './modules/presets/footer/footer.component';
import { IndexComponent } from './modules/index/index.component';
import { ListIdeasComponent } from './modules/ideas/list-ideas/list-ideas.component' 
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatStepperModule} from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    FooterComponent,
    IndexComponent,
    ListIdeasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule, 
    MatButtonModule, 
    MatCheckboxModule, 
    MatFormFieldModule, 
    MatIconModule, 
    MatInputModule,
    MatSelectModule, 
    MatToolbarModule,
    MatStepperModule,
    ReactiveFormsModule,//Add if needed 
    FormsModule,     //Add if needed  
    MatStepperModule, MatInputModule, MatButtonModule
  ],
  providers: [SharedDataModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
