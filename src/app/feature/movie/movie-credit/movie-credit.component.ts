import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie.class';
import { Credit } from 'src/app/model/credit.class';
import { MovieService } from 'src/app/service/movie.service';
import { CreditService } from 'src/app/service/credit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../base/base.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-credit',
  templateUrl: './movie-credit.component.html',
  styleUrls: ['./movie-credit.component.css']
})
export class MovieCreditComponent extends BaseComponent implements OnInit {
  title: string = "Movie-Credits";
  movieId: number = 0;
  movie: Movie = null;
  credits: Credit[] = [];

  constructor(private movieSvc: MovieService,
    private creditSvc: CreditService,
    private route: ActivatedRoute,
    private router: Router,
    protected location: Location) {
    super(location);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.route.params.subscribe(parms => this.movieId = parms["id"]);
    this.movieSvc.get(this.movieId).subscribe(jr => {
      if (jr.errors==null) {
        this.movie = jr.data as Movie;
      }
      else {
        console.log("Error getting movie",jr.errors);
      }
    });
    this.creditSvc.getAllActorsForMovie(this.movieId).subscribe(jr => {
      if (jr.errors==null) {
        this.credits = jr.data as Credit[];
      }
      else {
        console.log("Error getting movie-credits",jr.errors);
      }
    });

  }

  delete(creditId: number) {
    console.log("delte credit for id: "+creditId);
    this.creditSvc.delete(creditId).subscribe(jr => {
      if (jr.errors==null) {
        this.router.navigateByUrl("movie/credits/refresh/"+this.movieId);
      }
      else {
        console.log("*** error deleting a credit", jr.errors);
      }
    });
  }

}
