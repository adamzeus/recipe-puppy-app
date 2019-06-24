'use strict';

// Import core
import { NgModule } from '@angular/core';

// Dependency module imports.
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WidgetModule } from '../widget/widget.module';

// Import routes
import { Routes, RouterModule } from '@angular/router';

// Import components
import { RecipeSearchComponent } from './recipe-search-component';
import { RecipeResultsComponent } from './recipe-results.component';
import { RecipePuppyService } from '../shared/service/recipe-puppy.service';

const routes: Routes = [
  {
    path: '', component: RecipeSearchComponent
  },
  {
    path: 'results', component: RecipeResultsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    WidgetModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    RecipeSearchComponent,
    RecipeResultsComponent
  ],
  providers: [
    RecipePuppyService
  ]
})
export class RecipeModule { }
