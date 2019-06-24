'use strict';

import { NgModule } from '@angular/core';

// Module dependency imports.
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule, MatIconModule } from '@angular/material';

// Members.
import { BackNavigationComponent } from './back-navigation.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatListModule,
        MatIconModule
    ],
    exports: [
        BackNavigationComponent,
    ],
    declarations: [
        BackNavigationComponent,
    ]
})
export class BackNavigationModule { }
