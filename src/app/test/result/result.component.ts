import {Component, OnInit} from '@angular/core';
import {QuestionDisplay} from "../../models/question-display.model";
import {SouscriptionService} from "../../service/souscription.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent{
   questionsDisplay: QuestionDisplay[] = [];
   score= 0;
   color='';
  constructor(private souscriptionService: SouscriptionService,private router:Router) {
  }
  ngOnInit(): void {
    this.souscriptionService.answersQuizz$.subscribe({
      next: data=>{
        this.questionsDisplay = data!;
        this.score = this.questionsDisplay.filter(x=>x.isResponse == true).length;
      },complete: ()=>{

      }
    });
  this.getScoreColor();
  }

  private getScoreColor() {
    if(this.score <=1){
      this.color  = "red";
    }else if(this.score >1 && this.score <=3){
      this.color  = "yellow";
    }
    else if(this.score >3 && this.score <=5){
      this.color  = "green";
    }
  }

  goToQuizzPage() {
    this.router.navigate(['questions']);
  }
}
