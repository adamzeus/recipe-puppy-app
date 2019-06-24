import {
  Component, ViewChild, OnInit, Input, Output,
  EventEmitter, ElementRef
} from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material';
import { IModalDialogButton } from './modal-dialog-button.model';

@Component({
  selector: 'modal-dialog',
  templateUrl: 'modal-dialog.component.html',
  styleUrls: ['model-dialog.component.scss']
})
export class ModalDialogComponent implements OnInit {

  constructor(public dialog: MatDialog, public dialogElement: ElementRef) { }
  private _defaults = {
    title: 'Dialog',
    closeText: 'Close',
    applyText: 'Apply',
    maxHieght: 700,
    disableCloseOnScreen: false
  };

  dialogRef: any;
  @Input('close-text') closeText: string = this._defaults.closeText;
  @Input('apply-text') applyText: string = this._defaults.applyText;
  @Input('disable-close-onScreen') disableCloseOnScreen: boolean = this._defaults.disableCloseOnScreen;
  @Input('title') title: string = this._defaults.title;
  @Input('heading') heading: string;
  @Input('applyDisabled') applyDisabled: boolean;
  @Input('applyShown') applyShown: boolean;
  @Input('max-width') maxWidth: string = '450px';
  @Input('min-width') minWidth: string = '400px';
  @Input('additionalButtons') additionalButtons: IModalDialogButton[] = [];
  @Output('applyClick') applyClick: EventEmitter<void> = new EventEmitter<void>();
  @Output('closeClick') closeClick: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('tpl', { static: true }) template: any;

  ngOnInit() {
    this.config.width = this.maxWidth;
    this.config.disableClose = this.disableCloseOnScreen;
  }

  private config: MatDialogConfig = {
    width: this.maxWidth
  };

  activate() {
    if (window.innerHeight < this._defaults.maxHieght) {
      this.config.height = window.innerHeight.toString() + 'px';
    }
    this.dialogRef = this.dialog.open(this.template, this.config);
  }

  onResize = (event: any) => {
    if (event.srcElement.innerHeight < this._defaults.maxHieght) {
      this.config.height = event.srcElement.innerHeight.toString() + 'px';
      this.dialogRef.close();
      this.dialogRef = this.dialog.open(this.template, this.config);
      this.resetDimensions();
    }
  }

  resetDimensions = () => {
    this.config = {
      width: this.maxWidth
    };
  }

  closeDialog = (): void => {

    if (this.dialogRef) {
      this.dialogRef.close();
    }
    this.closeClick.emit();
  }

  onApplyClicked = (): void => {
    this.applyClick.emit();
    this.dialogRef.close();
  }
}


