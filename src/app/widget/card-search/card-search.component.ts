'use strict';

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'card-search',
  template: `<mat-card class="card-search">
                 <ng-content></ng-content>
               </mat-card>`,
  styleUrls: ['card-search.component.scss']
})

export class CardSearchComponent {
}

@Component({
  selector: 'card-search-header',
  templateUrl: 'card-search.component.html',
  styleUrls: ['card-search.component.scss']
})
export class CardSearchHeaderComponent {
  @Input('thumbnail') thumbnail: string;
  @Input('title') title: string;
  @Input('subtitle') subtitle: string;

  status: boolean = false;
  private propotionalHeight: string = '';
  private propotionalWidth: string = '';

  public loadImage(event: any) {
    if (event.srcElement.width > event.srcElement.height) {
      this.propotionalHeight = '40px';
      this.propotionalWidth = '';
    }
    else {
      this.propotionalWidth = '40px';
      this.propotionalHeight = '';
    }
  }

  onFavourite() {
    this.status = !this.status;
  }
}

@Component({
  selector: 'card-search-content',
  template: `<mat-card-content>
                <p>
                     <ng-content></ng-content>
                </p>
               </mat-card-content>`,
  styleUrls: ['card-search.component.scss']
})

export class CardSearchContentComponent {
}
