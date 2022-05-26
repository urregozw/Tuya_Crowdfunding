import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { HistoricGraphComponent } from './historic-graph/historic-graph.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgChartsModule } from 'ng2-charts';
import { NgxEditorModule } from 'ngx-editor';
import { ChatComponent } from '../chat/chat.component';
import { ChatService } from 'src/app/services/chat.service';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatSelectModule} from '@angular/material/select'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatAutocompleteModule}from '@angular/material/autocomplete'
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatStepperModule} from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ProjectService} from '../../services/project.service'
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { SocialLoginModule, SocialAuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import { GraphsComponent } from '../graphs/graphs.component';
import { IdeasModule } from '../ideas/ideas.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProfileComponent,
    HistoricGraphComponent,
    ChatComponent,

  ],
  imports: [
    SharedModule,
    NgxChartsModule,
    NgChartsModule,
    FormsModule,
    NgxEditorModule,
    CommonModule,
    UserRoutingModule,
    NgxEditorModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatStepperModule,
    ReactiveFormsModule,
  ],
  providers:[ChatService]
})
export class UserModule { }
