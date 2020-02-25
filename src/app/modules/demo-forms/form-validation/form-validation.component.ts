import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.scss']
})
export class FormValidationComponent implements OnInit {

  myForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      ID: ['', [Validators.required, Validators.pattern('^RXW[0-9]{3}$')]],
      age: ['', [Validators.min(18), Validators.max(65)]],
      ZIP: ['', [Validators.minLength(5), Validators.maxLength(5)]]
    });
  }

  onSubmit(): void {
    console.warn(this.myForm.value);
  }

  // getters for creating custom error messages
  get name() {
    return this.myForm.get('name');
  }

  get email() {
    return this.myForm.get('email');
  }

  get ID() {
    return this.myForm.get('ID');
  }

  get age() {
    return this.myForm.get('age');
  }

  get ZIP() {
    return this.myForm.get('ZIP');
  }

}
