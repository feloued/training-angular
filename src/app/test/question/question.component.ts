import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Answer} from "../../models/answer.model";
import {QuestionDisplay} from "../../models/question-display.model";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
@Input() questionDisplay?: QuestionDisplay;
  @Output() questionEmit = new EventEmitter<QuestionDisplay>();
color?: string;

  selectAnswer(answer: Answer) {
    answer.isChecked = true;
    const elem = this.questionDisplay?.answers?.find(item=>item.isChecked == true && item.name != answer.name);
    if(elem){
      elem.isChecked = false;
    }
      answer.isChecked = true;
    this.questionEmit.emit(this.questionDisplay);
  }
}
