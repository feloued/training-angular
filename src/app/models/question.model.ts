import {Answer} from "./answer.model";
import {IQuestionDisplay} from "./question-display.model";

export interface IQuestion {
  category?:          string;
  type?:              string;
  difficulty?:        string;
  question?:          string;
  correct_answer?:    string;
  incorrect_answers?: string[];
}

export class Question implements IQuestion{
  constructor(
    public category?: string,
    public type?: string,
    public difficulty?: string,
    public question?: string,
    public correct_answer?: string,
    public incorrect_answers?: string[]

  ){}
}
