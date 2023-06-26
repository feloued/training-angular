import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../../service/question.service";
import {Question} from "../../models/question.model";
import {QuestionDisplay} from "../../models/question-display.model";
import {Answer} from "../../models/answer.model";
import {SouscriptionService} from "../../service/souscription.service";
import {Router} from "@angular/router";
import {Categorie} from "../../models/category.model";
import {FilterParameter} from "../../models/filter-parameter.model";
import {cloneDeep} from "lodash";


@Component({
  selector: 'app-liste-question',
  templateUrl: './liste-question.component.html',
  styleUrls: ['./liste-question.component.css']
})
export class ListeQuestionComponent{

  questions: Question[] =[];
  questionsDisplay: QuestionDisplay[] =[];
  answers: Answer[] =[];
  categories: Categorie[] = [];
  filterParam: FilterParameter = new FilterParameter();

constructor(private questionService: QuestionService,
            private souscriptionService: SouscriptionService,
            private router: Router) {
}

  findListeQuestions(): void {
    this.questions = [];
  if(this.filterParam.category && this.filterParam.level )
    this.questionService.findListeQuestion(this.filterParam.category,this.filterParam.level).subscribe(
      {
        next: (result) => {
          if (result) {
           this.questions = result;
           //convertir a un objet AnswerDisplay
            this.transformeData();
          }
        },
        error: (reason) => {
          console.error(JSON.stringify(reason));
        }
      });
  }

  ngOnInit(): void {
  this.getCategorie();
  //this.findListeQuestions();
  }

  private transformeData() {
    this.questionsDisplay = [];
    this.questions.forEach(item=>{
      this.answers = [];
      const questionDisplay = new QuestionDisplay();
      questionDisplay.question = item.question;
      questionDisplay.difficulty = item.difficulty;
      questionDisplay.category = item.category;
      questionDisplay.type = item.type;
      questionDisplay.correct_answer = item.correct_answer;
      //ajouter la bonne reponse dans les reponses
      const trustedResp = new Answer();
      trustedResp.name = questionDisplay.correct_answer;
      trustedResp.isChecked = false;
      this.answers.push(trustedResp);

      item.incorrect_answers?.forEach(answer=>{
        const answ = new Answer();
        answ.name = answer;
        answ.isChecked = false;

        //ajout dans la liste des reponses
        this.answers.push(answ);

        // shot order answer
        this.answers = this.answers.sort((a, b) => 0.5 - Math.random());
      });
      questionDisplay.answers = this.answers;
      this.questionsDisplay.push(questionDisplay);

    });
}

  getValue($event: QuestionDisplay) {
    this.questionsDisplay.forEach(item=>{
      if(item.question == $event.question){
        item.answers = $event.answers;
      }
    });
    this.isDisplayBtn();
}

  isDisplayBtn(): boolean{
  let i = 0;
    this.questionsDisplay.forEach(item=>{
      item.answers?.forEach(answ=>{
        if(answ.isChecked){
          i = i+1;
        }
      });
    });
    return this.questionsDisplay.length == i;
  }

  goToResult() {
  const questionsDisplayCloned = cloneDeep(this.questionsDisplay);

    questionsDisplayCloned.forEach(item=>{
      const checkElem = item.answers?.find(elm=>elm.isChecked);
      if(checkElem && checkElem.name == item.correct_answer){
        checkElem.color ="#198754";
        item.isResponse = true;
      }else{
        item.isResponse = false;
        if(checkElem)
          checkElem.color ="red";
        const trustElem = item.answers?.find(elm=>elm.name == item.correct_answer);
        if(trustElem){
          trustElem.color ="#198754";
          trustElem.isChecked = true;
        }
      }
    });

    this.souscriptionService.setData(questionsDisplayCloned);
    this.router.navigate(['questions','result']);
  }

  getCategorie(): void{
  this.questionService.findListeCategory().subscribe({
    next: data=>this.categories = data
  })
  }
}
