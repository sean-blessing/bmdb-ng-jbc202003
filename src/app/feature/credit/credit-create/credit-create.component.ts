import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/model/actor.class';
import { Movie } from 'src/app/model/movie.class';
import { CreditService } from 'src/app/service/credit.service';
import { ActorService } from 'src/app/service/actor.service';
import { MovieService } from 'src/app/service/movie.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Credit } from 'src/app/model/credit.class';

@Component({
  selector: 'app-credit-create',
  templateUrl: './credit-create.component.html',
  styleUrls: ['./credit-create.component.css']
})
export class CreditCreateComponent implements OnInit {
  title: string = "Credit-Create";
  actors: Actor[] = [];
  movies: Movie[] = [];
  credit: Credit = new Credit();
  movieId: number = 0;
  movie: Movie = null;

  constructor(private creditSvc: CreditService,
              private actorSvc: ActorService,
              private movieSvc: MovieService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(parms => this.movieId = parms["movieId"]);
    // get the movie for the movieId passed in parms
    this.movieSvc.get(this.movieId).subscribe(jr => {
      if (jr.errors== null) {
        this.movie = jr.data as Movie;
        // default the credit to the movie passed in, as we are adding actors 
        // to that movie only 
        this.credit.movie = this.movie;
      }
    });

    this.actorSvc.list().subscribe(jr => {
      this.actors = jr.data as Actor[];
    });
    // movies list is only needed in v1 
    // this.movieSvc.list().subscribe(jr => {
    //   this.movies = jr.data as Movie[];
    // });
  }
  
  create() {
    this.creditSvc.create(this.credit).subscribe(jr => {
      if (jr.errors==null) {
        this.router.navigateByUrl("/movie/credits/"+this.movieId);
      }
      else {
        console.log("*** Error creating credit:  ",this.credit,jr.errors);
        alert("Error creating Credit.  Try Again.");
      }
    });
  }

}
