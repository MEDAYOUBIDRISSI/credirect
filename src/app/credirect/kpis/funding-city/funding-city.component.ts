import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-funding-city',
  templateUrl: './funding-city.component.html',
  styleUrl: './funding-city.component.scss'
})
export class FundingCityComponent implements OnInit {

  cities = ['rabat', 'casablanca', 'tanger', 'berrechid', 'fes', 'marrakech', 'mohammedia', 'agadir'];

  immobilier = {
    montant:   [5262723, 6622633, 3322650, 1235860, 700000, 1236500, 0, 0],
    taux:      [23, 28, 14, 5, 3, 5, 0, 0],
    dossiers:  [2, 3, 2, 2, 1, 2, 0, 0]
  };

  conso = {
    montant:   [5262723, 6622633, 3322650, 1235860, 700000, 1236500, 0, 0],
    taux:      [23, 28, 14, 5, 3, 5, 0, 0],
    dossiers:  [2, 3, 2, 2, 1, 2, 0, 0]
  };

  montantChartData: any;
  tauxChartData: any;
  dossiersChartData: any;

  barChartOpts: any;
  lineChartOpts: any;

  ngOnInit(): void {
    this.initOptions();
    this.buildCharts();
  }

  initOptions(): void {
    const css = getComputedStyle(document.documentElement);
    const textColor = css.getPropertyValue('--text-color') || '#000';
    const gridColor = css.getPropertyValue('--surface-border') || '#ccc';

    this.barChartOpts = {
      responsive: true,
      plugins: { legend: { labels: { color: textColor } } },
      scales: {
        x: { ticks: { color: textColor }, grid: { color: gridColor } },
        y: {
          beginAtZero: true,
          ticks: { color: textColor },
          grid: { color: gridColor }
        }
      }
    };

    this.lineChartOpts = {
      responsive: true,
      plugins: { legend: { labels: { color: textColor } } },
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: { ticks: { color: textColor }, grid: { color: gridColor } },
        y: {
          beginAtZero: true,
          ticks: { callback: (v: number) => v + '%', color: textColor },
          grid: { color: gridColor }
        }
      }
    };
  }

  buildCharts(): void {
    this.montantChartData = {
      labels: this.cities,
      datasets: [
        {
          label: 'Crédit Immobilier',
          data: this.immobilier.montant,
          backgroundColor: '#219ebc'
        },
        {
          label: 'Crédit Conso',
          data: this.conso.montant,
          backgroundColor: '#8ecae6'
        }
      ]
    };

    this.tauxChartData = {
      labels: this.cities,
      datasets: [
        {
          label: 'Crédit Immobilier',
          data: this.immobilier.taux,
          borderColor: '#fb8500',
          fill: false,
          tension: 0.3
        },
        {
          label: 'Crédit Conso',
          data: this.conso.taux,
          borderColor: '#ff706a',
          fill: false,
          tension: 0.3
        }
      ]
    };

    this.dossiersChartData = {
      labels: this.cities,
      datasets: [
        {
          label: 'Crédit Immobilier',
          data: this.immobilier.dossiers,
          backgroundColor: '#ffb703'
        },
        {
          label: 'Crédit Conso',
          data: this.conso.dossiers,
          backgroundColor: '#6a5acd'
        }
      ]
    };
  }
}
