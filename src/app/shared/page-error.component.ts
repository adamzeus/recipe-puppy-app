'use strict';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export class ErrorData {
    title: string;
    description?: string;
    icon?: string;
}

@Injectable()
export class PageErrorService {
    public errorData = new ErrorData();

    setErrorData = (errorTitle: string, errorDescription: string, icon: string): void => {
        this.errorData.title = errorTitle;
        this.errorData.description = errorDescription;
        this.errorData.icon = icon;
    }
}

@Component({
    template: `<error icon="{{errorIcon}}" error-title="{{errorTitle}}" error-description="{{errorDescription}}"></error>`
})

export class PageErrorComponent implements OnInit {
    returnUrl: string;

    constructor(public pageErrorService: PageErrorService,
        private router: Router, ) {
    }

    ngOnInit() {
  
        if (!this.pageErrorService.errorData.title) {
            this.router.navigate(['/']);
        }

        if (this.pageErrorService.errorData.title == '0') {
            this.pageErrorService.errorData.title = ''
            this.pageErrorService.errorData.description = 'No internet connection'
        }
    }

    get errorTitle(): string {
        return this.pageErrorService.errorData.title;
    }

    get errorDescription(): string {
        return this.pageErrorService.errorData.description;
    }

    get errorIcon(): string {
        return this.pageErrorService.errorData.icon
    }
}
