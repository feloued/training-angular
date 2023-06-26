import {Answer} from "./answer.model";

export interface IQuestionDisplay {
  category?:          string;
  type?:              string;
  difficulty?:        string;
  question?:          string;
  correct_answer?:    string;
  answers?: Answer[];
  isResponse?: boolean
}

export class QuestionDisplay implements IQuestionDisplay{
  constructor(
    public category?: string,
    public type?: string,
    public difficulty?: string,
    public question?: string,
    public correct_answer?: string,
    public answers?: Answer[],
    public isResponse?: boolean,

  ){}
}
