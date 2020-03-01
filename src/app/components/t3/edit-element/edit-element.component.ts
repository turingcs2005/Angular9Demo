import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodicElement } from '../../../interfaces/periodic-element';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// regular expressions for input validation: integer, number with up to 2 decimal digits
const numericNumberInt = '^-?[0-9]\\d*$';
const numericNumberReg = '^-?[0-9]\\d*(\\.\\d{1,2})?$';

@Component({
  selector: 'app-edit-element',
  templateUrl: './edit-element.component.html',
  styleUrls: ['./edit-element.component.scss']
})
export class EditElementComponent implements OnInit {

  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditElementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      position: ['', [Validators.required, Validators.pattern(numericNumberInt)]],
      weight: ['', [Validators.required, Validators.pattern(numericNumberReg)]],
      symbol: ['', Validators.required]
    });

    // ReactiveForm valueChanges() method returns an observable
    this.myForm.valueChanges.subscribe(value => {
      this.data.name = value.name;
      this.data.position = value.position;
      this.data.weight = value.weight;
      this.data.symbol = value.symbol;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
