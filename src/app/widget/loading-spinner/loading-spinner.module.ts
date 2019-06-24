'use strict';

import { NgModule } from '@angular/core';
// Module imports.
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';
// Members.
import {
  LoadingSpinnerComponent, LoadingSpinnerService
} from './loading-spinner.component';

@NgModule({
  imports: [
    CommonModule, MatProgressSpinnerModule
  ],
  declarations: [
    LoadingSpinnerComponent
  ],
  exports: [
    LoadingSpinnerComponent
  ]
})
export class LoaderSpinnerModule {
  static forRoot(): Array<any> {
    return [
      [LoadingSpinnerService]
    ];
  }
}
