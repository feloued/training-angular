import {Component} from '@angular/core';
import {QuestionDisplay} from "../../shared/models/question-display.model";
import {SouscriptionService} from "../../shared/services/souscription.service";
import {Router} from "@angular/router";
import {LocalService} from "../../shared/services/local.service";
import {GREEN_COLOR} from "../../shared/constants/constant";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  questionsDisplay: QuestionDisplay[] = [];
  score = 0;
  color = '';

  constructor(private souscriptionService: SouscriptionService, private router: Router, private localService: LocalService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void{
    this.souscriptionService.answersQuizz$.subscribe({
      next: data => {
        if(data.length > 0){
          this.questionsDisplay = data;
          this.localService.saveData("questionsDisplay",this.questionsDisplay);
        }else{
          this.questionsDisplay = this.localService.getData("questionsDisplay");
        }
        this.score = this.questionsDisplay.filter(x => x.isResponse == true).length;
      }
    });
    this.getScoreColor();
  }

  private getScoreColor() {
    if (this.score <= 1) {
      this.color = "red";
    } else if (this.score > 1 && this.score <= 3) {
      this.color = "yellow";
    } else if (this.score > 3 && this.score <= 5) {
      this.color = "green";
    }
  }

  goToQuizzPage() {
    this.localService.clearData();
    this.router.navigate(['questions']);
  }
}
