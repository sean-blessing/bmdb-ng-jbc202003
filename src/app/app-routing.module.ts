import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './feature/movie/movie-list/movie-list.component';
import { MovieCreateComponent } from './feature/movie/movie-create/movie-create.component';
import { MovieDetailComponent } from './feature/movie/movie-detail/movie-detail.component';
import { MovieEditComponent } from './feature/movie/movie-edit/movie-edit.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: MovieListComponent}, 
  {path: 'movie/list', component: MovieListComponent}, 
  {path: 'movie/create', component: MovieCreateComponent}, 
  {path: 'movie/detail/:id', component: MovieDetailComponent}, 
  {path: 'movie/edit/:id', component: MovieEditComponent}, 
  {path: '**', component: MovieListComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
