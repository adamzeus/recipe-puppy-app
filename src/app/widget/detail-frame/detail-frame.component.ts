'use strict';

import { Component, Directive, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Directive({ selector: 'detail-frame-header' })
export class DetailFrameHeaderDirective {
}

@Directive({ selector: 'detail-frame-title' })
export class DetailFrameTitleDirective {
}

@Directive({ selector: 'detail-frame-content' })
export class DetailFrameContentDirective {
}

@Directive({ selector: 'detail-frame-label' })
export class DetailFrameLabelDirective {
}

@Component({
  selector: 'detail-frame',
  template: '<ng-content></ng-content>',
  styleUrls: ['detail-frame.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailFrameComponent {
}
