'use strict';

import { NgModule } from '@angular/core';

// Module dependency imports.
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatIconModule, MatButtonModule } from '@angular/material';

// Members.
import {
  CardSearchComponent,
  CardSearchHeaderComponent,
  CardSearchContentComponent,
} from './card-search.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    CardSearchComponent,
    CardSearchHeaderComponent,
    CardSearchContentComponent,
  ],
  declarations: [
    CardSearchComponent,
    CardSearchHeaderComponent,
    CardSearchContentComponent,
  ]
})
export class CartSearchModule { }
