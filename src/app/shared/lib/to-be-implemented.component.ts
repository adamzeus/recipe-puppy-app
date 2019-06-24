'use strict';

import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { WidgetModule } from '../../widget/widget.module';

@Component({
    template: `<error icon="build" error-title="To be implemented"></error>`
       })
export class ToBeImplementedComponent {
}

@NgModule({
	declarations: [
		ToBeImplementedComponent
	],
    imports: [
        WidgetModule,
		RouterModule.forChild([
            {
                path: '', component: ToBeImplementedComponent
            }
		])
	]
})
export class ToBeImplementedModule {
}
