import { Injectable } from '@angular/core';
import {QuestionDisplay} from "../models/question-display.model";
import  *  as CryptoJS from  'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class LocalService {
  key = "$&AxcR?t";
  constructor() { }

  public saveData(key: string, data: QuestionDisplay[]) {
    localStorage.setItem(key, this.encrypt(JSON.stringify(data)));
  }

  public getData(key: string):QuestionDisplay[] {
    let data = localStorage.getItem(key)|| "";
    let resp = this.decrypt(data);
    return JSON.parse(resp);
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string): string {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }
}
