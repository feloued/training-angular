import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { ListeQuestionComponent } from './liste-question/liste-question.component';
import { QuestionComponent } from './question/question.component';
import { ResultComponent } from './result/result.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ListeQuestionComponent,
    QuestionComponent,
    ResultComponent
  ],
    imports: [
        CommonModule,
        TestRoutingModule,
        FormsModule
    ]
})
export class TestModule { }
