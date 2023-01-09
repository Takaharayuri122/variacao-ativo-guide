import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  /**
   * Gera uma string com query params para ser usada na chamada da API
   * quando um objeto for passado
   * @param params
   */
  public toQueryString(params: any = {}): string {
    return Object.keys(params)
      .filter((key) => params[key] !== "null" && params[key] !== null)
      .map((key) => {

        if (Array.isArray(params[key])) {
          let url = '';
          const _array = Object.assign([], params[key]) as any[];

          _array.forEach((item, index) => {
            url += `${key}=${item}${(index < _array.length - 1) ? '&' : ''}`;
          });

          return url;
        }
        else {
          return `${key}=${params[key]}`;
        }
      })
      .join("&");
  }
}
