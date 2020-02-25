import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-array-forms',
  templateUrl: './array-forms.component.html',
  styleUrls: ['./array-forms.component.scss']
})
export class ArrayFormsComponent implements OnInit {

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
      }),

      // 'familyMembers' is an empty array
      familyMembers: this.fb.array([])
    });
  }

  // a getter returning familyMember FormGroup array via 'get' function. AbstractControl is type-casted into FormArray
  get familyMemberForms() {
    return this.myForm.get('familyMembers') as FormArray;
  }


  // add a new family member FormGroup
  addFamilyMember() {

    const familyMember = this.fb.group({
      relation: '',
      firstName: '',
      lastName: ''
    });

    this.familyMemberForms.push(familyMember);
  }

  removeFamilyMember(i: number) {
    this.familyMemberForms.removeAt(i);
  }

  onSubmit(): void {
    console.warn(this.myForm.value);
  }

}
