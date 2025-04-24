import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorie-client',
  templateUrl: './categorie-client.component.html',
  styleUrl: './categorie-client.component.scss'
})
export class CategorieClientComponent implements OnInit {

  private readonly creditData = {
    'immobilier': {
      categories: ['salariés', 'commerçant', 'gérant de société', 'fonctionnaire', 'retraité', 'profession libérale'],
      montant: [5262723, 6622633, 3322650, 1235000, 700000, 1236500],
      taux: [23, 28, 14, 5, 3, 5],
      dossiers: [2, 3, 2, 3, 1, 2]
    },
    'consommation': {
      categories: ['salariés', 'commerçant', 'gérant de société', 'fonctionnaire', 'retraité', 'profession libérale'],
      montant: [5262723, 6622633, 3322650, 1235000, 700000, 1236500],
      taux: [23, 28, 14, 5, 3, 5],
      dossiers: [2, 3, 2, 3, 1, 2]
    },
    'hypothécaire': {
      categories: ['salariés', 'commerçant', 'gérant de société', 'fonctionnaire', 'retraité', 'profession libérale'],
      montant: [3000000, 4200000, 1800000, 1200000, 700000, 1300000],
      taux: [12, 42, 18, 12, 7, 9],
      dossiers: [1, 4, 2, 1, 1, 2]
    }
  };

  creditTypeOptions = Object.keys(this.creditData).map(key => ({ label: key, value: key }));
  selectedCreditType = this.creditTypeOptions[0];

  amountChartData: any;
  percentageChartData: any;
  dossiersChartData: any;

  barChartOpts: any;
  doughnutOpts: any;

  ngOnInit(): void {
    this.initChartOptions();
    this.buildCharts();
  }

  initChartOptions(): void {
    const text = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
    const border = getComputedStyle(document.documentElement).getPropertyValue('--surface-border');

    this.barChartOpts = {
      indexAxis: 'y',
      scales: {
        x: { ticks: { color: text }, grid: { color: border } },
        y: { ticks: { color: text }, grid: { color: border } }
      },
      plugins: { legend: { display: false } },
      responsive: true
    };

    this.doughnutOpts = {
      plugins: {
        legend: {
          position: 'right',
          labels: { color: text }
        }
      },
      responsive: true
    };
  }

  buildCharts(): void {
    const kpi = this.creditData[this.selectedCreditType.value];

    this.amountChartData = {
      labels: kpi.categories,
      datasets: [
        { label: 'Montant (€)', data: kpi.montant, backgroundColor: '#219ebc' }
      ]
    };

    this.percentageChartData = {
      labels: kpi.categories,
      datasets: [
        { label: 'Taux (%)', data: kpi.taux, backgroundColor: ['#8ecae6', '#219ebc', '#ffb703', '#fb8500', '#ff706a', '#6a5acd'] }
      ]
    };

    this.dossiersChartData = {
      labels: kpi.categories,
      datasets: [
        { label: 'Nombre de dossiers', data: kpi.dossiers, backgroundColor: '#ffafcc' }
      ]
    };
  }
}