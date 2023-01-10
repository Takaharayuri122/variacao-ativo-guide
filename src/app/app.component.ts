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

  /**
   * Data atual
   */
  private today = dayjs(dayjs().format('YYYY-MM-DD'));

  /**
   * Data autal -30 dias para pegar o range do mês
   */
  private lastDate = dayjs(this.today).subtract(30, 'days');


  /**
   * Todos os dados para plotar o gráfico
   */
  public lineChartData!: ChartConfiguration<'line'>['data'];


  private formatedData: any[] = [];


  public chartOptions: ChartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || '';
            return [
              ` Ativo: ${label}`,
              `Valor: R$ ${this.formatedData[context.dataIndex].open}`,
              `Variação D-1: ${this.formatedData[context.dataIndex].variationDay}`,
              `Variação primeira data: ${this.formatedData[context.dataIndex].variationForFirst}`
            ]
          },
          title: () => {
            return ''
          }
        }
      }
    }
  }



  private symbol = 'PETR4.SA';


  ngOnInit(): void {
    this.getFinanceData();
  }

  private getFinanceData() {
    this.financeService.getData(this.symbol, { interval: '1d', period1: this.lastDate.unix(), period2: this.today.unix() }).subscribe({
      next: (response) => {
        this.formatedData = response.formatedData;
        this.lineChartData = {
          labels: response.labels,
          datasets: [{
            data: response.data,
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
