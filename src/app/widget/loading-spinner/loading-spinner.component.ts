'use strict';

import { Component, Injectable, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'loader-spinner',
  styleUrls: ['./loading-spinner.component.scss'],
  template: `<div class="loading-indicator" *ngIf="showLoader">
                    <mat-spinner></mat-spinner>
               </div>`
})
export class LoadingSpinnerComponent {
  @Input('showLoader') showLoader: boolean;
}

@Injectable()
export class LoadingSpinnerService {
  public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  display(value: boolean) {
    setTimeout(() => {
      this.status.next(value)
    },0);
  }
}
