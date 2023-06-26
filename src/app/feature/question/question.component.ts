import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Answer} from "../../shared/models/answer.model";
import {QuestionDisplay} from "../../shared/models/question-display.model";

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
    /** Verification de l'existance d'une question deja selectionnée **/
    const elem = this.questionDisplay?.answers?.find(item => item.isChecked == true && item.name != answer.name);
    if (elem) {
      elem.isChecked = false;
    }
    this.questionEmit.emit(this.questionDisplay);
  }
}
