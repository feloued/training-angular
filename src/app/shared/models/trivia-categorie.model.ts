import {Categorie} from "./category.model";

export interface ITriviaCategorie {
  trivia_categories?: Categorie[];
}

export class TriviaCategorie implements ITriviaCategorie{
  constructor(
    public trivia_categories?: Categorie[],
  ){}
}
