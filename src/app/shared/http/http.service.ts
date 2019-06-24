'use strict';

import { HttpClient, HttpParams, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HandleError, HttpErrorHandler } from '../http/http-error-handler.service';


@Injectable()
export class HttpService {

    private handleError: HandleError;

    constructor(private http: HttpClient,
        httpErrorHandler: HttpErrorHandler
    ) {
        this.handleError = httpErrorHandler.createHandleError();
    }

    /**
     * @description Call Http GET
     * @param url
     * @param params
     * @param calledFrom name of service/component for error logging
     */
    get<T>(url: string, params: IKeyVal<string>[], calledFrom: string): Observable<T> {
        let httpReqParams: HttpParams = new HttpParams();
        params.forEach(p => {
            httpReqParams = httpReqParams.append(p.key, p.val);
        });
        return this.http.get<T>(url, { params: httpReqParams })
            .pipe(
                map((response: T) => {
                    return response;
                }),
                catchError(this.handleError(calledFrom, null))
            );
    }
   
}

export interface IKeyVal<T> {
    key: string;
    val: T;
}
