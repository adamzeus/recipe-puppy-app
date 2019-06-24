'use strict';

import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';

export function getParamFromRoute(param: string, route: ActivatedRouteSnapshot): string {
	let currRoute: ActivatedRouteSnapshot = route;
	while (currRoute) {
		let value: string = (<{ [key: string]: string }>currRoute.params)[param];
		if (value) {
			return value;
		}

		currRoute = currRoute.parent;
	}
	return null;
};

export function getQueryParamFromRoute(param: string, route: ActivatedRouteSnapshot): string {
    let currRoute: ActivatedRouteSnapshot = route;
    while (currRoute) {
        let value: string = (<{ [key: string]: string }>currRoute.queryParams)[param];
        if (value) {
            return value;
        }

        currRoute = currRoute.parent;
    }
    return null;
};

export function getDataFromRoute(key: string, route: ActivatedRouteSnapshot): string {
	let currRoute: ActivatedRouteSnapshot = route;
	while (currRoute) {
		let value: string = (<{ [key: string]: string }>currRoute.data)[key];
		if (value) {
			return value;
		}
		currRoute = currRoute.parent;
	}
	return null;
};
