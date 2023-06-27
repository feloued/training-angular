import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpinnerComponent} from "./pages/spinner/spinner.component";
import { DecodePipe } from './pipes/decode.pipe';



@NgModule({
  declarations: [
    SpinnerComponent,
    DecodePipe,
  ],
  exports: [
    SpinnerComponent,
    DecodePipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
