'use strict';

import { NgModule } from '@angular/core';

// Members.
import {
  DetailFrameComponent,
  DetailFrameContentDirective,
  DetailFrameHeaderDirective,
  DetailFrameTitleDirective,
  DetailFrameLabelDirective
} from './detail-frame.component';

@NgModule({
  declarations: [
    DetailFrameComponent,
    DetailFrameContentDirective,
    DetailFrameHeaderDirective,
    DetailFrameTitleDirective,
    DetailFrameLabelDirective
  ],
  exports: [
    DetailFrameComponent,
    DetailFrameContentDirective,
    DetailFrameHeaderDirective,
    DetailFrameTitleDirective,
    DetailFrameLabelDirective
  ],
})
export class DetailFrameModule {
}
