import { Component, OnInit, Inject } from '@angular/core';
import { PeriodicElement } from '../../../interfaces/periodic-element';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement
    ) { }


    ngOnInit(): void {}

    delete() {
      this.dialogRef.close(
        true  // send deletion confirmation
      );
    }

    close() {
      this.dialogRef.close();
    }

}
