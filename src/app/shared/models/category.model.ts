
export interface ICategorie {
  id?: number;
  name?: string;
}

export class Categorie implements ICategorie{
  constructor(
    public id?: number,
    public name?: string,
  ){}
}
