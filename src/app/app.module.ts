// Members
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './shared/page-not-found.component';
import { PageErrorComponent, PageErrorService } from './shared/page-error.component';
// Module dependency imports
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { WidgetModule } from './widget/widget.module';
import { Routes, RouterModule } from '@angular/router';


// Feature modules
import { CoreHttpModule } from './shared/core-http.module';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', loadChildren: './recipe/recipe.module#RecipeModule' },
  { path: 'error', component: PageErrorComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    PageErrorComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    WidgetModule.forRoot(),
    CoreHttpModule.forRoot(),
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false // for Debugging of the routes
    })
  ],
  exports: [
    RouterModule
  ],
  providers: [
    PageErrorService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
