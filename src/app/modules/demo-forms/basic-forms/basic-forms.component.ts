import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-basic-forms',
  templateUrl: './basic-forms.component.html',
  styleUrls: ['./basic-forms.component.scss']
})
export class BasicFormsComponent implements OnInit {

  myForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.myForm = new FormGroup({

      firstName: new FormControl(''),
      lastName: new FormControl(''),

      address: new FormGroup({
        street: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
        zip: new FormControl('')

      })
    });
  }

  onSubmit(): void {
    console.warn(this.myForm.value);
  }

  // set value for entire FormGroup
  setValue(): void {
    this.myForm.setValue({
      firstName: 'Claire',
      lastName: 'Wang',
      address: {
        street: '61 Maple St Apt D',
        city: 'Canton',
        state: 'MA',
        zip: '02021'
      }
    });
  }

  // patch a subset of values for FormGroup
  patchValue(): void {
    this.myForm.patchValue({
      firstName: 'Vera',
      lastName: 'Zhao',
      address: {
        city: 'Boston'
      }
    });
  }

  // access FormControl via 'get' method
  get firstName() {
    return this.myForm.get('firstName') as FormControl;
  }

  get lastName() {
    return this.myForm.get('lastName') as FormControl;
  }

  get address() {
    return this.myForm.get('address') as FormGroup;
  }

  // first get() for FormGroup 'address'; second get() for FormControl 'street'
  get street() {
    return this.address.get('street') as FormGroup;
  }


}
