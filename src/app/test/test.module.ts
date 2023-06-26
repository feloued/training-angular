import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { ListeQuestionComponent } from './liste-question/liste-question.component';
import { QuestionComponent } from './question/question.component';
import {BorderColorAnswerDirective} from "../directive/border-color-answer.directive";
import { ResultComponent } from './result/result.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ListeQuestionComponent,
    QuestionComponent,
    BorderColorAnswerDirective,
    ResultComponent
  ],
    imports: [
        CommonModule,
        TestRoutingModule,
        FormsModule
    ]
})
export class TestModule { }
