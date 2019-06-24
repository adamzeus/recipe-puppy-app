'use strict';

// Import core
import { NgModule, ModuleWithProviders } from '@angular/core';

// Dependency module imports.
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorHandler } from './http/http-error-handler.service';

import { AuthHttpInterceptor } from './http/auth-httpInterceptor.service';
import { HttpService } from './http/http.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  declarations: [
  ],
  exports: [
    HttpClientModule
  ],
  providers: []
})
export class CoreHttpModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreHttpModule,
      providers: [
        HttpErrorHandler,
        HttpService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthHttpInterceptor,
          multi: true
        },
      ]
    };
  }

}
