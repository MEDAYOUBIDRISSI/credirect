import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monthly-flow-by-organisme',
  templateUrl: './monthly-flow-by-organisme.component.html',
  styleUrl: './monthly-flow-by-organisme.component.scss'
})
export class MonthlyFlowByOrganismeComponent implements OnInit {

  private readonly data: Record<string, any> = {
    'organisme 1': {
      months: ['janv', 'févr', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc'],
      depot:   [200000, 384000, 864000, 1200000, 1500000, 1490000, 1400000, 1250000, 1778216, 0, 0, 0],
      accord:  [174000, 264000, 656000, 960000, 1440000, 1192000, 1120000, 1000000, 625000, 0, 0, 0],
      debloc:  [174000, 240000, 240000, 240000, 250000, 250000, 240000, 230000, 100000, 0, 0, 0],
      convPct: [87, 69, 80, 80, 80, 80, 80, 80, 35, 0, 0, 0],
      transPct:[100, 91, 50, 33, 27, 21, 21, 23, 16, 0, 0, 0],
      concrPct:[100, 95, 37, 50, 32, 24, 28, 25, 16, 0, 0, 0]
    },
    'organisme 2': { /* same structure */ } as any
  };

  organismeOptions = Object.keys(this.data).map(key => ({ label: key, value: key }));
  selectedOrganisme = this.organismeOptions[0];

  chartData: any;
  chartOpts: any;

  ngOnInit(): void {
    this.initOptions();
    this.buildChart();
  }

  private initOptions(): void {
    const css = getComputedStyle(document.documentElement);
    const text = css.getPropertyValue('--text-color');
    const textSec = css.getPropertyValue('--text-color-secondary');
    const grid = css.getPropertyValue('--surface-border');

    this.chartOpts = {
      responsive: true,
      interaction: { mode: 'index', intersect: false },
      plugins: { legend: { labels: { color: text } } },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: textSec },
          title: { display: true, text: 'Montant (€)', color: text }
        },
        y1: {
          position: 'right',
          beginAtZero: true,
          ticks: { callback: v => v + '%', color: textSec },
          grid: { drawOnChartArea: false },
          title: { display: true, text: 'Taux (%)', color: text }
        },
        x: {
          ticks: { color: textSec },
          grid: { color: grid }
        }
      }
    };
  }

  buildChart(): void {
    const kpi = this.data[this.selectedOrganisme.value];

    const barDatasets = [
      { type: 'bar', label: 'Dépôts',     data: kpi.depot,   backgroundColor: '#219ebc' },
      { type: 'bar', label: 'Accords',    data: kpi.accord,  backgroundColor: '#8ecae6' },
      { type: 'bar', label: 'Déblocages', data: kpi.debloc,  backgroundColor: '#ffb703' }
    ];

    const lineDatasets = [
      { type: 'line', label: '% conversion',     data: kpi.convPct, borderColor: '#fb8500', yAxisID: 'y1', tension: 0.3 },
      { type: 'line', label: '% transformation', data: kpi.transPct, borderColor: '#ff706a', yAxisID: 'y1', tension: 0.3 },
      { type: 'line', label: '% concrétisation', data: kpi.concrPct, borderColor: '#6a5acd', yAxisID: 'y1', tension: 0.3 }
    ];

    this.chartData = {
      labels: kpi.months,
      datasets: [...barDatasets, ...lineDatasets]
    };
  }
}