import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpinnerComponent} from "./pages/spinner/spinner.component";



@NgModule({
  declarations: [
    SpinnerComponent,
  ],
  exports: [
    SpinnerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
