'use strict';

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'error',
    templateUrl: 'error.component.html',
    styleUrls: ['error.component.scss']
})
export class ErrorComponent {
    @Input('error-title') title: string;
    @Input('error-description') description: string;
    @Input('icon') icon: string = 'clear';

}
