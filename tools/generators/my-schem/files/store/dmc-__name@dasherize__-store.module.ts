import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';

import { Dmc<%= classify(name) %>Reducer } from './dmc<%= dasherize(name) %>Reducer.reducer';

@NgModule({
  imports: [BrowserModule, StoreModule.forRoot({ dmc: Dmc<%= classify(name) %>Reducer })],
  providers: []
})
export class Dmc<%= classify(name) %>Module { }
