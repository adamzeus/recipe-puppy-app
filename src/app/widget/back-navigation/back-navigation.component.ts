'use strict';

import {Component, Input} from '@angular/core';

@Component({
    selector: 'back-navigation',
    templateUrl: 'back-navigation.component.html',
    styleUrls: ['back-navigation.component.scss']
})

export class BackNavigationComponent {

    @Input('label') label: string;
    @Input('title') title: string;
    @Input('link') link: string;
}
