import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicFormsComponent } from './basic-forms/basic-forms.component';
import { SharedModule } from '../shared/shared.module';
import { BuilderFormsComponent } from './builder-forms/builder-forms.component';
import { ArrayFormsComponent } from './array-forms/array-forms.component';
import { FormValidationComponent } from './form-validation/form-validation.component';

@NgModule({
  declarations: [BasicFormsComponent, BuilderFormsComponent, ArrayFormsComponent, FormValidationComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    BasicFormsComponent
  ]
})
export class DemoFormsModule { }
