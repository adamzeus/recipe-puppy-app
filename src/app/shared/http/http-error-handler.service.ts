import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../widget/snackbar/snackbar.component';
import { PageErrorService } from '../page-error.component';

/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type HandleError =
    <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

/** Handles HttpClient errors */
@Injectable()
export class HttpErrorHandler {
    constructor(private snackbar: SnackbarService,
        public pageError: PageErrorService,
        private router: Router,
        private route: ActivatedRoute) { }

    /** Create curried handleError function that already knows the service name */
    createHandleError = (serviceName = '') => <T>
        (operation = 'operation', result = {} as T) => this.handleError(serviceName, operation, result)

    /**
     * Returns a function that handles Http operation failures.
     * This error handler lets the app continue to run as if no error occurred.
     * @param serviceName = name of the data service that attempted the operation
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    handleError<T>(serviceName = '', operation = 'operation', result = {} as T) {

        return (error: HttpErrorResponse): Observable<T> => {

            const message = (error.error instanceof ErrorEvent) ?
                error.error.message :
                `server returned code ${error.status} with body "${error.error}"`;

            if (error instanceof HttpErrorResponse) {
                //toDo will need to navigate to error pages here.
                switch ((<HttpErrorResponse>error).status) {
                    case 400:
                    case 401:
                    case 200:
                        this.snackbar.source$.next({
                            message: `${error.error}`
                        });
                        break;
                    case 500:
                      break;
                    default:
                        this.pageError.setErrorData(error.status.toString(), error.statusText, 'error');
                        this.gotoErrorPage();
                        this.logError(error);
                }
            }
            else {
                this.logError(error);
                // TODO: better job of transforming error for user consumption
                this.pageError.setErrorData(serviceName, message, 'error');
                this.gotoErrorPage();
                //this.snackbar.source$.next({
                //    message: `${serviceName}: ${operation} failed: ${message}`
                //});
            }

            // Let the app keep running by returning a safe result.
            return of(result);
        };

    }
    private logError(error: HttpErrorResponse): void {
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
    }

    private gotoErrorPage() {
        this.router.navigate(['/error'], { relativeTo: this.route });
    }

}


