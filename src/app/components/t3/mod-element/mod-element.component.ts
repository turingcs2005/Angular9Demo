import { Component, OnInit, Inject } from '@angular/core';

import { PeriodicElement } from '../../../interfaces/periodic-element';
import { Operation } from '../../../interfaces/miscellaneous';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//  MAT_DIALOG_DATA is an injectable for passing data from the parent component into dialog component.
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// regular expressions for input validation: integer, number with up to 2 decimal digits
const numericNumberInt = '^-?[0-9]\\d*$';
const numericNumberReg = '^-?[0-9]\\d*(\\.\\d{1,4})?$';

@Component({
  selector: 'app-mod-element',
  templateUrl: './mod-element.component.html',
  styleUrls: ['./mod-element.component.scss']
})
export class ModElementComponent implements OnInit {

  myForm: FormGroup;
  operationType: string;

  constructor(
    private fb: FormBuilder,
    // dialogRef is a reference to the dialog instance, so we can close it and pass output data back to the parent component.
    private dialogRef: MatDialogRef<ModElementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {op: Operation, element: PeriodicElement}
    ) { }

  ngOnInit(): void {
    if (this.data.op == Operation.Add) {
      this.operationType = 'Add';
    } else {
      this.operationType = 'Edit';
    }

    this.myForm = this.fb.group({
      name: ['', Validators.required],
      position: ['', [Validators.required, Validators.pattern(numericNumberInt)]],
      weight: ['', [Validators.required, Validators.pattern(numericNumberReg)]],
      symbol: ['', Validators.required]
    });

    // set default values based on injected data
    this.myForm.setValue({
      name: this.data.element.name,
      position: this.data.element.position,
      weight: this.data.element.weight,
      symbol: this.data.element.symbol
    });
  }

  save() {
    this.dialogRef.close(
      {
        op: this.data.op,
        element: this.myForm.value
      }
    );
  }

  close() {
    this.dialogRef.close();
  }

}
