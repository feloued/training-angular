import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListeQuestionComponent} from "./liste-question/liste-question.component";
import {ResultComponent} from "./result/result.component";

const routes: Routes = [
  {
    path: '',
    component: ListeQuestionComponent
  },
  {
    path: 'result',
    component: ResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
