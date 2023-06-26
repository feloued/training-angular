import {Component} from '@angular/core';
import {QuestionService} from "../../shared/services/question.service";
import {Question} from "../../shared/models/question.model";
import {QuestionDisplay} from "../../shared/models/question-display.model";
import {Answer} from "../../shared/models/answer.model";
import {SouscriptionService} from "../../shared/services/souscription.service";
import {Router} from "@angular/router";
import {Categorie} from "../../shared/models/category.model";
import {FilterParameter} from "../../shared/models/filter-parameter.model";
import {cloneDeep} from "lodash";
import {LEVEL} from "../../shared/constants/constant";
import {Observable} from "rxjs";


@Component({
  selector: 'app-liste-question',
  templateUrl: './liste-question.component.html',
  styleUrls: ['./liste-question.component.css']
})
export class ListeQuestionComponent {

  questions: Question[] = [];
  questionsDisplay: QuestionDisplay[] = [];
  answers: Answer[] = [];
  categories: Categorie[] = [];
  categories$?:Observable<Categorie[]>
  filterParam: FilterParameter = new FilterParameter();

  levels = LEVEL;

  constructor(private questionService: QuestionService,
              private souscriptionService: SouscriptionService,
              private router: Router) {
  }

  findListeQuestions(): void {
    this.questions = [];
    if (this.filterParam.category && this.filterParam.level)
      this.questionService.findListeQuestion(this.filterParam.category, this.filterParam.level).subscribe(
        {
          next: (result) => {
            if (result) {
              this.questions = result;
              /** Conversion de l'objet pour type AnswerDisplay  **/
              this.transformeData();
            }
          },
          error: (reason) => {
            console.error(JSON.stringify(reason));
          }
        });
  }

  ngOnInit(): void {
    this.categories$ = this.questionService.categories$;
    //this.getCategorie();
  }

  private transformeData() {
    this.questionsDisplay = [];
    this.questions.forEach(item => {
      this.answers = [];
      const questionDisplay = new QuestionDisplay();
      questionDisplay.question = item.question;
      questionDisplay.difficulty = item.difficulty;
      questionDisplay.category = item.category;
      questionDisplay.type = item.type;
      questionDisplay.correct_answer = item.correct_answer;
      /** Construction objet bonne reponse  **/
      const trustedResp = new Answer();
      trustedResp.name = questionDisplay.correct_answer;
      trustedResp.isChecked = false;
      /** On insere de l'objet bonne reponse dans la liste des reponses possibles **/
      this.answers.push(trustedResp);

      /** Reconstruction de la liste des reponses possibles **/
      item.incorrect_answers?.forEach(answer => {
        const answ = new Answer();
        answ.name = answer;
        answ.isChecked = false;
        this.answers.push(answ);

        /** Random de la liste des reponses possibles **/
        this.answers = this.randomAnswer(this.answers);
      });
      questionDisplay.answers = this.answers;
      this.questionsDisplay.push(questionDisplay);
    });
  }

  randomAnswer(data: Answer[]): Answer[] {
    for (let i = data.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = data[i];
      data[i] = data[j];
      data[j] = tmp;
    }
    return data;
  }

  getValue($event: QuestionDisplay) {
    this.questionsDisplay.forEach(item => {
      if (item.question == $event.question) {
        item.answers = $event.answers;
      }
    });
    this.isDisplayBtn();
  }

  isDisplayBtn(): boolean {
    let i = 0;
    this.questionsDisplay.forEach(item => {
      item.answers?.forEach(answ => {
        if (answ.isChecked) {
          i = i + 1;
        }
      });
    });
    return this.questionsDisplay.length == i;
  }

  goToResult() {
    /**
     * This is the get function
     * @param age This is the age parameter
     * @returns returns a string version of age
     */
    const questionsDisplayCloned = cloneDeep(this.questionsDisplay);
    questionsDisplayCloned.forEach(item => {
      const checkElem = item.answers?.find(elm => elm.isChecked);
      if (checkElem && checkElem.name == item.correct_answer) {
        checkElem.color = "#198754";
        item.isResponse = true;
      } else {
        item.isResponse = false;
        if (checkElem)
          checkElem.color = "red";
        const trustElem = item.answers?.find(elm => elm.name == item.correct_answer);
        if (trustElem) {
          trustElem.color = "#198754";
          trustElem.isChecked = true;
        }
      }
    });
    this.souscriptionService.setData(questionsDisplayCloned);
    this.router.navigate(['questions', 'result']);
  }

  getCategorie(): void {
    this.questionService.findListeCategory().subscribe({
      next: data => this.categories = data
    })
  }

  trackByQname(index: number, item: QuestionDisplay) {
    return item.question;
  }

}
