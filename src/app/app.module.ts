import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopBarComponent } from './components/t1/top-bar/top-bar.component';
import { HomeComponent } from './components/t1/home/home.component';
import { AboutComponent } from './components/t1/about/about.component';


import { SharedModule } from './modules/shared/shared.module';
import { DemoFormsModule } from './modules/demo-forms/demo-forms.module';
import { MaterialTableComponent } from './components/t2/material-table/material-table.component';
import { HttpCallsComponent } from './components/t2/http-calls/http-calls.component';

import { HttpClientModule } from '@angular/common/http';
import { ModElementComponent } from './components/t3/mod-element/mod-element.component';
import { ConfirmDeleteComponent } from './components/t3/confirm-delete/confirm-delete.component';
import { SnackBarComponent } from './components/t4/snack-bar/snack-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    HomeComponent,
    AboutComponent,
    MaterialTableComponent,
    HttpCallsComponent,
    ModElementComponent,
    ConfirmDeleteComponent,
    SnackBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    DemoFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]

  // entryComponents are generated dynamically. Somehow this isn't needed in Angular 9.
  // entryComponents: [ModElementComponent]
})
export class AppModule { }
