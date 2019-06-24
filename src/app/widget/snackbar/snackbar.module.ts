'use strict';

import { NgModule } from '@angular/core';

// Module imports.
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material';

// Members.
import { SnackbarComponent, SnackbarService } from './snackbar.component';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  declarations: [
    SnackbarComponent
  ],
  exports: [
    SnackbarComponent
  ]
})
export class SnackbarModule {
  static forRoot(): Array<any> {
    return [
      [SnackbarService]
    ];
  };
}
