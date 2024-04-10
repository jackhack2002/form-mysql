import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentInfoComponent } from './student-info/student-info.component';
import { GetInfoComponent } from './get-info/get-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlphabetInputDirective } from './directives/alphabet-input.directive';
import { MobileNumberDirective } from './directives/mobile-number.directive';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StudentInfoComponent,
    GetInfoComponent,
    AlphabetInputDirective,
    MobileNumberDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
