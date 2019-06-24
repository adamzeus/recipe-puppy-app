'use strict';

import { NgModule, ModuleWithProviders } from '@angular/core';

// Module dependency imports.
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
   MatButtonModule, MatCheckboxModule,  MatToolbarModule, MatCardModule,
    MatProgressBarModule, MatProgressSpinnerModule, MatIconModule, MatSnackBarModule, MatTooltipModule, MatDialogModule
} from '@angular/material';

// Member import modules.
import { ModalDialogModule } from './modal-dialog/modal-dialog.module';
import { SnackbarModule } from './snackbar/snackbar.module';

// Member declarations.
import { DetailFrameModule } from './detail-frame/detail-frame.module';
import { LoaderSpinnerModule } from './loading-spinner/loading-spinner.module';
import { BackNavigationModule } from './back-navigation/back-navigation.module';
import { ErrorModule } from './error/error.module';
import { CartSearchModule } from './card-search/card-search.module'

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatCardModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatDialogModule,
        ModalDialogModule,
        SnackbarModule,
        DetailFrameModule,
        LoaderSpinnerModule,       
        BackNavigationModule,
        ErrorModule,       
        CartSearchModule,    
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatCardModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatDialogModule,
        ModalDialogModule,
        SnackbarModule,
        DetailFrameModule,
        LoaderSpinnerModule,       
        BackNavigationModule,
        ErrorModule,       
        CartSearchModule
    ],
    providers: [],
    declarations: []
})
export class WidgetModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: WidgetModule,
            providers: [
                ...SnackbarModule.forRoot(),
                ...LoaderSpinnerModule.forRoot()
            ]
        };
    }
}
