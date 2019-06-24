'use strict';
import { AfterViewInit, Injectable, Component, OnInit } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../widget/snackbar/snackbar.component';
import { RoutingBaseComponent } from '../shared/lib/routing-base.component';
import { IRecipePuppyFilter } from '../models/recipe-puppy';
import { RecipePuppyService } from '../shared/service/recipe-puppy.service';

@Component({
  selector: 'recipe-search',
  templateUrl: './recipe-search-component.html',
  styleUrls: ['recipe-search.component.scss']

})

export class RecipeSearchComponent extends RoutingBaseComponent implements OnInit {

  recipePuppyFilters: IRecipePuppyFilter[];

  constructor(
    private recipePuppyService: RecipePuppyService,
    snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super(snackbarService);
  }

  ngOnInit() {
    this.addForDisposal = this.route.snapshot.data['recipes'];
    this.recipePuppyFilters = this.recipePuppyService.getFilters();

    if (this.recipePuppyService.recipeIngredients.length > 0) {
      this.recipePuppyService.recipeIngredients.forEach(x => {
        this.recipePuppyFilters.forEach(item => {
          if (x == item.ingredient) {
            item.checked = true;
          }
        });
      });
      this.recipePuppyService.recipeIngredients.forEach(r => {        
      })
    }
  }

  onClearRecipePuppyFilter() {
    this.recipePuppyService.recipeIngredients = [];

    this.recipePuppyFilters.forEach(item => {
      item.checked = false;
    });
  }

  onRecipePuppySearch() {
    var selected = this.recipePuppyFilters.filter(a => a.checked == true);
    this.recipePuppyService.addIngredients(selected);

    this.router.navigate(['results'], { relativeTo: this.route });
  }


  get disableSearch(): boolean {
    var selected = this.recipePuppyFilters.filter(a => a.checked == true);
    return !(selected.length > 0);
  }
}


