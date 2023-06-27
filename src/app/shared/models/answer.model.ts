import {IQuestionDisplay} from "./question-display.model";

export interface IAnswer {
  name?: string;
  color?: string;
  isChecked?: boolean;
}

export class Answer implements IAnswer{
  constructor(
    public name?: string,
    public color?: string,
    public isChecked?: boolean,
  ){}
}
