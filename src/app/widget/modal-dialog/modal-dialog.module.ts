'use strict';

import { NgModule } from '@angular/core';

// Module imports.
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';
// Members.
import { ModalDialogComponent } from './modal-dialog.component';

@NgModule({
  imports: [
    CommonModule, MatDialogModule, MatButtonModule
  ],
  declarations: [
    ModalDialogComponent
  ],
  exports: [
    ModalDialogComponent,
  ]
})
export class ModalDialogModule {
}
