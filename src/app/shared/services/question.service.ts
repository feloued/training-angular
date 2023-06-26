import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Question} from "../models/question.model";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Results} from "../models/results.model";
import {TriviaCategorie} from "../models/trivia-categorie.model";
import {Categorie} from "../models/category.model";

const questionUrl= "https://opentdb.com/api.php";
const categorieUrl= "https://opentdb.com/api_category.php";
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  categories$: BehaviorSubject<Categorie[]> = new BehaviorSubject<Categorie[]>([]);
  constructor(private http: HttpClient) {
    this.initListeCategory();
  }

  initListeCategory(): void {
    this.findListeCategory().subscribe({
      next: response => {
        this.categories$.next(response);
      }
    });
  }

  findListeQuestion(category: number, level: string): Observable<Question[]> {
    const params = new HttpParams({
      fromObject: {
        amount: 5,
        category: category,
        difficulty: level,
        type: 'multiple',
      }
    });
    return this.http.get<Results>(questionUrl,{ params: params }).pipe(map(result=><Question[]>result.results));
  }

  findListeCategory(): Observable<Categorie[]> {
    return this.http.get<TriviaCategorie>(categorieUrl).pipe(map(result=><Categorie[]>result.trivia_categories));
  }
}
