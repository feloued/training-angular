import {Component, OnInit} from '@angular/core';
import {map, Observable, Subscription} from "rxjs";
import {QuestionDisplay} from "../../models/question-display.model";
import {SouscriptionService} from "../../service/souscription.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit{
   questionsDisplay: QuestionDisplay[] = [];
   score= 0;
   color='';
   souscription?: Subscription;
  constructor(private souscriptionService: SouscriptionService,private router:Router) {
  }
  ngOnInit(): void {
    this.souscription = this.souscriptionService.getData().subscribe({
      next: data=>{
        this.questionsDisplay = data;
        this.score = 0;
        this.questionsDisplay.forEach(item=>{
          const checkElem = item.answers?.find(elm=>elm.isChecked);
          if(checkElem && checkElem.name == item.correct_answer){
            checkElem.color ="#198754";
            this.score = this.score + 1;
            console.warn("rentre ici bon :",item);
          }else{
            if(checkElem)
            checkElem.color ="red";
            const trustElem = item.answers?.find(elm=>elm.name == item.correct_answer);
            if(trustElem){
              console.warn("rentre ici choix :",item);
              trustElem.color ="#198754";
              trustElem.isChecked = true;
            }
          }
        });
      },complete: ()=>{
        this.souscription?.unsubscribe();
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
