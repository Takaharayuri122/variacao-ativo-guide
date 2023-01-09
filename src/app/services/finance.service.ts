import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FinanceDTO } from '../models/finance';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  protected readonly API_URL = environment.apiUrl;

  constructor(
    private readonly http: HttpClient, 
    private readonly utils: UtilsService
    ) { }


  public getData(symbol: string, filter:any): Observable<FinanceDTO> {
    const queryParams = this.utils.toQueryString(filter);
    return this.http.get<FinanceDTO>(`${this.API_URL}/finance/chart/${symbol}?${queryParams}`);
  }
}
