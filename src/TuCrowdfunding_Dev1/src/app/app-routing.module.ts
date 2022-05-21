import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from './modules/index/index.component'
import {ListIdeasComponent} from './modules/ideas/list-ideas/list-ideas.component'
import {IdeaComponent} from './modules/ideas/idea/idea.component'
import { AuthComponent } from './modules/auth/auth.component';
const routes: Routes = [
  {path: '', component: IndexComponent },
  {path: 'ideas',loadChildren: () => import('./modules/ideas/ideas.module').then(m => m.IdeasModule)},
  {path:'login',component:AuthComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
