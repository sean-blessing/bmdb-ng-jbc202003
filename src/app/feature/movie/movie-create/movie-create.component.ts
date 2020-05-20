import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie.class';
import { MovieService } from 'src/app/service/movie.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-movie-create',
  templateUrl: '../movie-maint-shared/movie-maint.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent extends BaseComponent implements OnInit {
  title: string = "Movie-Create";
  movie: Movie = new Movie();
  submitBtnTitle: string = "Create";

  constructor(private movieSvc: MovieService,
              private router: Router,
              protected location: Location) { 
                super(location);
              }

  ngOnInit(): void {
    // do nothing
  }

  save() {
    this.movieSvc.create(this.movie).subscribe(jr => {
      // if jr.errors is null, save was successful
      if (jr.errors==null) {
        // success
        this.router.navigateByUrl("/movie/list");
      }
      else {
        console.log("*** Error creating new movie:", this.movie, jr.errors);
      }
    }

    );

  }

}
