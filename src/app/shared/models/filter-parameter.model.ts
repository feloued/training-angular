
export interface IFilterParameter {
  category?: number;
  level?: string;
}

export class FilterParameter implements IFilterParameter{
  constructor(
    public category?: number,
    public level?: string,
  ){}
}
