'use strict';

import {RoutedBaseComponent} from './routed-base.component';
import {SnackbarService} from '../../widget/snackbar/snackbar.component';

export abstract class RoutingBaseComponent extends RoutedBaseComponent {
	constructor(
		snackbar: SnackbarService,
	) {
		super(snackbar);
	};
}
