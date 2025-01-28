import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DesktopVehiclesComponent } from './desktop-vehicles/desktop-vehicles.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { FormControl, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DesktopVehiclesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule, HttpClientModule, BrowserAnimationsModule,MatButtonModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
