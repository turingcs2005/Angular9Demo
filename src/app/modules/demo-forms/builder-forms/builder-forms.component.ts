import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-builder-forms',
  templateUrl: './builder-forms.component.html',
  styleUrls: ['./builder-forms.component.scss']
})
export class BuilderFormsComponent implements OnInit {

  myForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        zip: ['']
      })
    });
  }

  onSubmit(): void {
    console.warn(this.myForm.value);
  }


}
