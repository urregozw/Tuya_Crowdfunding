import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from './modules/index/index.component'
import {ListIdeasComponent} from './modules/ideas/list-ideas/list-ideas.component'
const routes: Routes = [
  {path: '', component: IndexComponent },
  { path: 'ideaporcategoria', component: ListIdeasComponent},
  {path: 'ideas',loadChildren: () => import('./modules/ideas/ideas.module').then(m => m.IdeasModule)},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
