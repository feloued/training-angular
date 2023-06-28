import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'decode'
})
export class DecodePipe implements PipeTransform {

  transform(value: string): string | null {
    /**
     * This is the pipe permit to unescape characters
     * @param value This is the value parameter
     * @returns return a string unescaped
     */
    const doc = new DOMParser().parseFromString(value, 'text/html');
    return doc.documentElement.textContent;
  }
}
