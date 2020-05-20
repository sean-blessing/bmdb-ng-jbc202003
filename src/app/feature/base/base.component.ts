import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  template: ''
})
export class BaseComponent implements OnInit {
  sortCriteria: string = "id";
  sortOrder: string = "asc";
  constructor(protected location: Location) { }

  ngOnInit(): void {
  }

  sortBy(column: string): void {
    if(column == this.sortCriteria) {
      this.sortOrder = (this.sortOrder == "desc") ? "asc" : "desc";
    }
    this.sortCriteria = column;
  }

  backClicked() {
    this.location.back();
  }
}
