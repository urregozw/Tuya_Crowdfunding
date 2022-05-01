import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MisIdeasComponent} from './mis-ideas/mis-ideas.component'
import {IdeaRegisterComponent} from './idea-register/idea-register.component'
import { ListIdeasComponent } from './list-ideas/list-ideas.component';
const routes: Routes = [
  {path:'misideas', component: MisIdeasComponent },
  {path:'registraridea', component: IdeaRegisterComponent },
  { path: 'proyectos', component: ListIdeasComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdeasRoutingModule { }
