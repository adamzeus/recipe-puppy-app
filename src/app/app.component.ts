'use strict';
import { Component, HostBinding, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from './widget/snackbar/snackbar.component';
import { LoadingSpinnerService } from './widget/loading-spinner/loading-spinner.component';
import { RoutingBaseComponent } from './shared/lib/routing-base.component';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent extends RoutingBaseComponent implements OnInit, OnDestroy {
  showLoader: boolean;
  constructor(
    private router: Router,
    private loadingSpinnerService: LoadingSpinnerService,
    private snackbarService: SnackbarService,
  ) {
    super(snackbarService);

    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  ngOnInit() {

    setTimeout(() => this.loadingSpinnerService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    }));
  }
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      setTimeout(() => {
        this.showLoader = true;
      }, 0);      
    }
    if (event instanceof NavigationEnd) {
      setTimeout(() => {
        this.showLoader = false;
      }, 0);      
    }
    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      setTimeout(() => {
        this.showLoader = false;
      }, 0);   
    }
    if (event instanceof NavigationError) {
      setTimeout(() => {
        this.showLoader = false;
      }, 0);   
    }
  }
}
