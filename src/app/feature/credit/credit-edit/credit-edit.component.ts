import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/model/actor.class';
import { Movie } from 'src/app/model/movie.class';
import { Credit } from 'src/app/model/credit.class';
import { CreditService } from 'src/app/service/credit.service';
import { ActorService } from 'src/app/service/actor.service';
import { MovieService } from 'src/app/service/movie.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-credit-edit',
  templateUrl: './credit-edit.component.html',
  styleUrls: ['./credit-edit.component.css']
})
export class CreditEditComponent implements OnInit {
  title: string = "Credit-Edit";
  actors: Actor[] = [];
  movies: Movie[] = [];
  credit: Credit = new Credit();
  creditId: number = 0;

  constructor(private creditSvc: CreditService,
    private actorSvc: ActorService,
    private movieSvc: MovieService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // get the credit id from the url
    this.route.params.subscribe(parms => this.creditId = parms['id']);
    // get the credit for the id passed in url
    this.creditSvc.get(this.creditId).subscribe(jr => {
      this.credit = jr.data as Credit;
    });
    // populate the list of actors
    this.actorSvc.list().subscribe(jr => {
      this.actors = jr.data as Actor[];
    });
    // populate the list of movies
    this.movieSvc.list().subscribe(jr => {
      this.movies = jr.data as Movie[];
    });

  }

  save() {
    this.creditSvc.edit(this.credit).subscribe(jr => {
      if (jr.errors==null) {
        this.router.navigateByUrl("/credit/list");
      }
      else {
        console.log("*** Error editing credit:  ",this.credit,jr.errors);
        alert("Error editing Credit.  Try Again.");
      }
    });
  }

  compMovie(a: Movie, b: Movie): boolean {
    return a && b && a.id === b.id;
  }

  compActor(a: Actor, b: Actor): boolean {
    return a && b && a.id === b.id;
  }

}
