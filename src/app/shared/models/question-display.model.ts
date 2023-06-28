import {Answer} from "./answer.model";

export class QuestionDisplay {
  constructor(
    public category?: string,
    public type?: string,
    public difficulty?: string,
    public question?: string,
    public correct_answer?: string,
    public answers?: Answer[],
    public isResponse?: boolean,
  ) {
  }
}
