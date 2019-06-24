'use strict';

import { NgModule } from '@angular/core';

// Module dependency imports.
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatButtonModule } from '@angular/material';

// Members.
import { ErrorComponent } from './error.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatButtonModule
    ],
    exports: [
        ErrorComponent
    ],
    declarations: [
        ErrorComponent
    ]
})
export class ErrorModule { }
