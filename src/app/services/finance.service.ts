import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FinanceDTO } from '../models/finance';
import { UtilsService } from './utils.service';
import * as dayjs from 'dayjs'
import { FormatedChartData, FormatedData } from '../models/chart';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  protected readonly API_URL = environment.apiUrl;

  constructor(
    private readonly http: HttpClient,
    private readonly utils: UtilsService
  ) { }

  /**
   * Retorna informações dos pregões no serviço do Yahoo
   * @param symbol Nome do ativo
   * @param filter Filtros para busca
   * @returns Observable<FormatedChartData>
   */

  public getData(symbol: string, filter: any): Observable<FormatedChartData> {
    const queryParams = this.utils.toQueryString(filter);
    return this.http.get<FinanceDTO>(`${this.API_URL}/finance/chart/${symbol}?${queryParams}`)
      .pipe(map(response => {
        return this.preFormatData(response);
      }));
  }

  /**
   * Retorna os dados pre-formatados prontos para plotar o gráfico
   * @param response 
   * @returns FormatedChartData
   */
  private preFormatData(response: FinanceDTO): FormatedChartData {
    let formatedValue: any[] = [];
    let labelsChart: string[] = [];
    let dataChart: number[] = [];

    const [data] = response.chart.result;
    const [{ open }] = data.indicators.quote;


    open.forEach((item, index) => {
      let percentageVariation = null;
      let percentageVariationForFist = null;

      if (index > 0) {
        percentageVariation = +(((item - open[index - 1]) / open[index - 1]) * 100).toFixed(2);
        percentageVariationForFist = +(((item - open[0]) / open[0]) * 100).toFixed(2);
      }

      formatedValue[index] = {
        open: +item.toFixed(2),
        date: dayjs.unix(data.timestamp[index]).format('DD/MM/YYYY'),
        variationDay: (percentageVariation) ? `${percentageVariation}%` : '-',
        variationForFirst: (percentageVariationForFist) ? `${percentageVariationForFist}%` : '-'
      };

      labelsChart.push(formatedValue[index].date);
      dataChart.push(formatedValue[index].open);

    });

    return {
      labels: labelsChart,
      data: dataChart,
      formatedData: formatedValue
    };
  }
}
