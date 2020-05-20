import { Component, OnInit } from '@angular/core';
import { Credit } from 'src/app/model/credit.class';
import { Router, ActivatedRoute } from '@angular/router';
import { CreditService } from 'src/app/service/credit.service';
import { Location } from '@angular/common';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-credit-detail',
  templateUrl: './credit-detail.component.html',
  styleUrls: ['./credit-detail.component.css']
})
export class CreditDetailComponent extends BaseComponent implements OnInit {
  title: string = 'Credit-Detail';
  credit: Credit;
  id: number;

  constructor(private creditSvc: CreditService,
              private router: Router,
              private route: ActivatedRoute,
              protected location: Location) {
                super(location);
               }

  ngOnInit() {
    // get the credit id from the url
    this.route.params.subscribe(parms => this.id = parms['id']);
    this.creditSvc.get(this.id).subscribe( jr => {
      this.credit = jr.data as Credit;
    });
  }

  delete() {
    this.creditSvc.delete(this.id).subscribe(jr => {
      console.log("credit delete jr:",jr);
      // Sean owes fix here to jr.  we will assume delete was successful
      if (jr.errors != null) {
        console.log("Error deleting credit: "+jr.errors);
      }
      this.router.navigateByUrl("credit/list");
    });
  }
}
