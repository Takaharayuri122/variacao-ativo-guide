import { Component } from '@angular/core';
import { FinanceService } from './services/finance.service';
import * as dayjs from 'dayjs'
import { Chart, Meta } from './models/finance';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private financeService: FinanceService) { }

  private today = dayjs(dayjs().format('YYYY-MM-DD'));
  private lastDate = dayjs(this.today).subtract(30, 'days');

  chartData!: any;
  exchangeData!: Meta;

  public lineChartData!: ChartConfiguration<'line'>['data'];

  public lineChartLegend = true;

  private labels: string[] = [];
  private data: number[] = [];

  ngOnInit(): void {
    this.getFinanceData();
  }

  private getFinanceData() {
    this.financeService.getData('PETR4.SA', { interval: '1d', period1: this.lastDate.unix(), period2: this.today.unix() }).subscribe({
      next: (response) => {
        let formated: any[] = [];

        const [data] = response.chart.result;
        const [{ open, close }] = data.indicators.quote;


        open.forEach((item, index) => {
          let percentageVariation = null;
          let percentageVariationForFist = null;

          if (index > 0) {
            percentageVariation = +(((item - open[index - 1]) / open[index - 1]) * 100).toFixed(2);
            percentageVariationForFist = +(((item - open[0]) / open[0]) * 100).toFixed(2);
          }

          formated[index] = {
            open: +item.toFixed(2),
            date: dayjs.unix(data.timestamp[index]).format('DD/MM/YYYY'),
            variationDay: (percentageVariation) ? `${percentageVariation}%` : null,
            variationForFirst: (percentageVariationForFist) ? `${percentageVariationForFist}%` : null
          };

          this.labels.push(formated[index].date);
          this.data.push(formated[index].open);
        });

        this.lineChartData = {
          labels: this.labels,
          datasets: [{
            data: this.data,
            label: 'PETR4.SA',
            fill: true,
            tension: 0.5,
            borderColor: 'black',
            backgroundColor: 'rgba(255,0,0,0.3)'
          }]
        }
      },
      error: () => { }
    });
  }
}
