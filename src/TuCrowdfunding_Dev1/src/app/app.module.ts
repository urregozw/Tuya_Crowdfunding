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
import { FooterComponent } from './modules/presets/footer/footer.component';
import { IndexComponent } from './modules/index/index.component';
import { ListIdeasComponent } from './modules/ideas/list-ideas/list-ideas.component'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatStepperModule} from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ProjectService} from './services/project.service'
import { HttpClientModule } from '@angular/common/http';
import { MisIdeasComponent } from './modules/ideas/mis-ideas/mis-ideas.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxEditorModule } from 'ngx-editor';
import { AuthComponent } from './modules/auth/auth.component';
import { SocialLoginModule, SocialAuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { UserModule } from './modules/user/user.module';
import { ChatService } from './services/chat.service';
import { ChatComponent } from './modules/chat/chat.component';
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import { RegistryComponent } from './modules/registry/registry.component';
import { SharedModule } from './modules/shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    IndexComponent,
    AuthComponent,
    RegistryComponent,
  ],
  imports: [
    SharedModule,
    NgbCollapseModule,
    NgxEditorModule,
    SocialLoginModule,
    UserModule,
    HttpClientModule,
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
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '551561859853615' // add web app client id
            )
          }
        ]
      } as SocialAuthServiceConfig
    },
  SharedDataModule,ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
