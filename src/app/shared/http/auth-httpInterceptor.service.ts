import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  constructor() { }

  addToken(req: HttpRequest<any>): HttpRequest<any> {

     return req.clone({
       setHeaders: {
          'Content-Type': 'application/json',
          //'Access-Control-Allow-Origin': '*',
          //'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization',
          //'Access-Control-Allow-Credentials': 'true',
          //'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        }
    });
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addToken(req));
  }
}
