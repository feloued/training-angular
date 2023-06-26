import { Injectable } from '@angular/core';
import {QuestionDisplay} from "../models/question-display.model";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SouscriptionService {
  constructor() { }
  answersQuizz$ = new BehaviorSubject<QuestionDisplay[]>([]);
  setData(data: QuestionDisplay[]) {
    this.answersQuizz$.next(data);
  }
  getData(): Observable<QuestionDisplay[]> {
    return this.answersQuizz$;
  }

}
