'use strict';

import { Component, Output, Input, EventEmitter, NgZone, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

const DEFAULT_TIMEOUT: number = 4000;

export class SnackbarService {
  source$: Subject<ISnackbarData> = new Subject<ISnackbarData>();
  dismissSource$: Subject<any> = new Subject();
  isSnackbarActive: boolean = false;
}

export interface ISnackbarData {
  message: string;
  timeout?: number;
  actionCallback?: () => void;
  actionText?: string;
}

@Component({
  selector: 'snackbar',
  template: ``,
  styleUrls: ['./snackbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SnackbarComponent implements OnDestroy {
  isMessageSnackbarActive: boolean = false;
  actionText: string;
  savedActionSnackbarData: any;
  private actionCallback: () => void;
  private messageSnackbarQueue: Array<ISnackbarData> = [];
  private subscription: Subscription;
  private dissmissSubscription: Subscription;
  @Output() emitActionSnackbar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() actionMessageText: string;
  @Input() actionButtonText: string;

  constructor(private zone: NgZone, private service: SnackbarService, public snackBar: MatSnackBar) {
    this.subscription = service.source$.subscribe((data: ISnackbarData): void => {
      if (data.actionCallback) {
        if (!data.message && this.actionMessageText) {
          data.message = this.actionMessageText;
        }
        if (data.actionText) {

          this.actionText = data.actionText;
        } else if (this.actionButtonText) {
          this.actionText = this.actionButtonText;
        }
        setTimeout(() => this.displaySnackbar(data));
      } else {
        if (data.message.length !== 0 || data.message !== '') {
          this.messageSnackbarQueue.push(data);
          setTimeout(() => this.processMessageQueue());
        }
      }
    });
    this.dissmissSubscription = service.dismissSource$.subscribe((): void => {
      this.dismissSnackBar();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.dissmissSubscription) {
      this.dissmissSubscription.unsubscribe();
    }
  }

  processMessageQueue = () => {
    if (this.messageSnackbarQueue.length > 0 && !this.isMessageSnackbarActive) {
      this.displaySnackbar(this.messageSnackbarQueue.shift());
      this.isMessageSnackbarActive = true;
    } else {
      if (this.savedActionSnackbarData && !this.isMessageSnackbarActive) {
        this.displaySnackbar(this.savedActionSnackbarData);
      }
    }
  }

  displaySnackbar = (data: ISnackbarData) => {
    let config = new MatSnackBarConfig();
    if (data.actionCallback) {
      this.actionCallback = data.actionCallback;
      this.snackBar.open(data.message, this.actionText, config);
      //this.emitActionSnackbar.emit(true); 
      this.service.isSnackbarActive = true;
      this.savedActionSnackbarData = data;
      this.snackBar._openedSnackBarRef.onAction().subscribe(() => {
        // this.emitActionSnackbar.emit(false);
        this.actionCallback();
        this.service.isSnackbarActive = false;
      });
    } else {
      config.duration = data.timeout || DEFAULT_TIMEOUT;
      this.snackBar.open(data.message, null, config);
      this.snackBar._openedSnackBarRef.afterDismissed().subscribe(() => {
        this.isMessageSnackbarActive = false;
        this.service.isSnackbarActive = false;
        this.processMessageQueue();
      });
    }
  }

  onActionClick = (): void => {
    if (this.actionCallback) {
      this.actionCallback();
    }
  }
  dismissSnackBar = (): void => {
    if (this.snackBar._openedSnackBarRef) {
      this.snackBar._openedSnackBarRef.dismiss();
      this.service.isSnackbarActive = false;
      this.savedActionSnackbarData = undefined;
      // this.emitActionSnackbar.emit(false);
    }
  }
}
