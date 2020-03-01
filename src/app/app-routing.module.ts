import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/t1/home/home.component';
import { BasicFormsComponent } from './modules/demo-forms/basic-forms/basic-forms.component';
import { AboutComponent } from './components/t1/about/about.component';
import { BuilderFormsComponent } from './modules/demo-forms/builder-forms/builder-forms.component';
import { ArrayFormsComponent } from './modules/demo-forms/array-forms/array-forms.component';
import { FormValidationComponent } from './modules/demo-forms/form-validation/form-validation.component';
import { MaterialTableComponent } from './components/t2/material-table/material-table.component';
import { HttpCallsComponent } from './components/t2/http-calls/http-calls.component';
import { EditElementComponent } from './components/t3/edit-element/edit-element.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'forms/basic-forms', component: BasicFormsComponent },
  { path: 'forms/builder-forms', component: BuilderFormsComponent },
  { path: 'forms/array-forms', component: ArrayFormsComponent },
  { path: 'forms/form-validation', component: FormValidationComponent },
  { path: 'material-table', component: MaterialTableComponent },
  { path: 'http-calls', component: HttpCallsComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
