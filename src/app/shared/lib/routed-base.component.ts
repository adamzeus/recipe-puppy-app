'use strict';

import { HttpErrorResponse } from '@angular/common/http';
import { OnDestroy } from '@angular/core';
import { SnackbarService } from '../../widget/snackbar/snackbar.component';
import { Subscription } from 'rxjs';

export abstract class RoutedBaseComponent implements OnDestroy {
	constructor(private snackbar: SnackbarService) {
	};

	protected queueMessage = (message: string): void => {
		this.snackbar.source$.next({
			message: message
		});
	};

	protected showCancelSnackbar = (data: any): void => {
		this.snackbar.source$.next(data);
	};

	protected dismissSnackBar = (): void => {
		this.snackbar.dismissSource$.next();
	};

    protected queueResponseMessage = (err: HttpErrorResponse): void => {
        var rtnError;

        let result: HttpErrorResponse;
        if (err.error instanceof Error) {
            rtnError = 'An error occurred:', err.error.message;
		} else {
            rtnError = `Backend returned code ${err.status}, body was: ${err.error}`
		}
		this.snackbar.source$.next({
            message: rtnError
		});
	};

	protected addForDisposal = (subscription: Subscription): void => {
		this.subscriptions.push(subscription);
	};

	protected onDestroy = () => { };

	ngOnDestroy() {
		this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
		if (this.snackbar && this.snackbar.isSnackbarActive) {
			this.snackbar.dismissSource$.next();
		}
		this.subscriptions = null;
		this.snackbar = null;
		
		if (this.onDestroy) {
			this.onDestroy();
		}
	};
	private subscriptions: Array<Subscription> = [];
}
