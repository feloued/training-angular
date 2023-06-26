import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import {FormsModule} from "@angular/forms";
import {ListeQuestionComponent} from "./liste-question/liste-question.component";
import {QuestionComponent} from "./question/question.component";
import {ResultComponent} from "./result/result.component";


@NgModule({
  declarations: [
    ListeQuestionComponent,
    QuestionComponent,
    ResultComponent],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    FormsModule
  ]
})
export class FeatureModule { }
