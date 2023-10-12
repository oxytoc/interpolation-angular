import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InterpolationComponent } from './interpolation/interpolation.component';

@NgModule({
  declarations: [
    AppComponent,
    InterpolationComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    InterpolationComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
