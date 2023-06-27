import {Question} from "./question.model";
export interface IResults {
  results?: Question[];
}
export class Results implements IResults{
  constructor(
    public results?: Question[],
  ){}
}
