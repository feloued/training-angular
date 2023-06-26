import { Injectable } from '@angular/core';
import {QuestionDisplay} from "../models/question-display.model";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SouscriptionService {
  constructor() { }
  private subject = new BehaviorSubject<QuestionDisplay[]>([]);
  setData(data: QuestionDisplay[]) {
    this.subject.next(data);
  }
  getData(): Observable<QuestionDisplay[]> {
    return this.subject.asObservable();
  }

}
