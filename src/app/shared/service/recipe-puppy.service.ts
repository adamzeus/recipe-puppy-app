'use strict';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { IKeyVal, HttpService } from '../http/http.service';
import { IRecipePuppy, IRecipePuppyFilter } from '../../models/recipe-puppy';

const CACHE_SIZE = 1;

@Injectable()
export class RecipePuppyService {
  private _recipeIngredients: Array<string> = new Array<string>();
  set recipeIngredients(value) {
    this._recipeIngredients = value;
  }
  get recipeIngredients() {
    return this._recipeIngredients;
  }

  private $recipePuppyCache: Observable<IRecipePuppy>;
  private $recipeIngredientsCache: string;

  constructor(private httpService: HttpService) { }

  Search(page: number): Observable<IRecipePuppy> {

    var ingredients = this.recipeIngredients.join(',');
    var isCached: boolean = false;

    //Only cache 1st page
    if (!this.$recipePuppyCache && page == 1) {
      isCached = false;
      //return cached observable where the ingredients match and the page is 1
    } else if (this.$recipeIngredientsCache === ingredients && page == 1) {
      isCached = true
    } else {
      isCached = false;
    }

    if (isCached) {
      return this.$recipePuppyCache;
    } else if (!isCached && page == 1) {
      this.$recipeIngredientsCache = ingredients;
      this.$recipePuppyCache = this.requestIngredients(ingredients, page).pipe(
        shareReplay(CACHE_SIZE)
      );
      return this.$recipePuppyCache;
    } else {
      //Don't cache other requests
      return this.requestIngredients(ingredients, page);
    }
  }

  private requestIngredients(ingredients: string, page: number) {
    const httpReqParams: IKeyVal<string>[] = [
      { key: 'i', val: ingredients },
      { key: 'p', val: page.toString() }
    ];

    return this.httpService.get<IRecipePuppy>(this.getFullURL('/api/?'), httpReqParams, 'RecipePuppyService').pipe(
      map(response => response)
    );
  }

  getFilters(): IRecipePuppyFilter[] {
    return [
      { ingredient: 'beef', checked: false },
      { ingredient: 'cheese', checked: false },
      { ingredient: 'chicken ', checked: false },
      { ingredient: 'flour', checked: false },
      { ingredient: 'garlic', checked: false },
      { ingredient: 'mushroom', checked: false },
      { ingredient: 'paprika', checked: false },
      { ingredient: 'potato', checked: false },
      { ingredient: 'rice', checked: false },
      { ingredient: 'tomato', checked: false }
    ];
  }


  addIngredients(ingredients: IRecipePuppyFilter[]) {
    this._recipeIngredients = [];

    ingredients.forEach(item => {
      this._recipeIngredients.push(item.ingredient);
    });
  }

  private getFullURL(url: string) {
    return environment.corsHelpURL + '/' + environment.RecipePuppyURL + url;
  }
}
