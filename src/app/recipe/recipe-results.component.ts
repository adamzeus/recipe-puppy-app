'use strict';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, interval, timer } from 'rxjs';
import { SnackbarService } from '../widget/snackbar/snackbar.component';
import { RoutingBaseComponent } from '../shared/lib/routing-base.component';
import { getParamFromRoute } from '../shared/lib/route-params';
import { ModalDialogComponent } from '../widget/modal-dialog/modal-dialog.component';
import { LoadingSpinnerService } from '../widget/loading-spinner/loading-spinner.component';
import { IRecipePuppyResults, IRecipePuppy } from '../models/recipe-puppy';
import { RecipePuppyService } from '../shared/service/recipe-puppy.service';

@Component({
  selector: 'recipe-results',
  templateUrl: './recipe-results.component.html'
})

export class RecipeResultsComponent extends RoutingBaseComponent implements OnInit, AfterViewInit {
  private subscriptionTimer: Subscription;
  private $timer: Observable<number> = timer(1000, 2000);

  recipePuppyResults: IRecipePuppyResults[];

  favourites: string[];
  pageNumber: number = 1;
  timeLeft: number = 10;
  subscribeTimer: number;

  showNext: boolean = true;

  constructor(
    private recipePuppyService: RecipePuppyService,
    snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingSpinnerService: LoadingSpinnerService,
  ) {
    super(snackbarService);
  }

  @ViewChild('updateRecipes', { static: false }) private modalDialogUpdateRecipes: ModalDialogComponent;


  oberserableTimer() {
    this.onUnsubscribeTimer();

    this.subscriptionTimer = this.$timer.subscribe(val => {
      if (this.subscribeTimer <= 0) {
        this.onUnsubscribeTimer();
        this.modalDialogUpdateRecipes.activate();
      } else {
        //console.log(val, '-');
        this.subscribeTimer = this.timeLeft - val;
      }

    });
  }

  ngOnInit() {
    this.addForDisposal = this.route.snapshot.data['recipes'];
  }

  ngOnDestroy() {
    this.onUnsubscribeTimer();
  }

  private onUnsubscribeTimer() {
    if (this.subscriptionTimer) {
      this.subscriptionTimer.unsubscribe();
    }
    this.subscribeTimer = this.timeLeft;
  }


  ngAfterViewInit() {
    this.loadPageData(this.pageNumber);
  }

  loadPageData(pageNumber: number) {
    if (this.recipePuppyService.recipeIngredients.length === 0) {
      this.onNavigateBack(true);
    }
    else {
      this.loadingSpinnerService.display(true);
      this.recipePuppyService.Search(pageNumber)
        .subscribe((result: IRecipePuppy) => {
          this.loadingSpinnerService.display(false);
          if (result) {
            this.recipePuppyResults = result.results;
            this.showNext = true;
            this.oberserableTimer();
          } else {
            this.recipesNotFoundMessage();
          }

        });
    }
  }

  onNavigateBack(showmessage: boolean) {
    if (showmessage) {
      this.recipesNotFoundMessage();
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private recipesNotFoundMessage() {
    this.queueMessage('No more recipes found');
    this.showNext = false;
  }

  onNext() {
    this.pageNumber++;
    this.loadPageData(this.pageNumber);
  }

  onPrevious() {
    this.pageNumber--;
    this.loadPageData(this.pageNumber);
  }


  get showPrevious(): boolean {
    return (this.pageNumber > 1);
  }
}
