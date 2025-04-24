import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorie-client-v2',
  templateUrl: './categorie-client-v2.component.html',
  styleUrl: './categorie-client-v2.component.scss'
})
export class CategorieClientV2Component implements OnInit {

  combinedChartData: any;
  combinedChartOpts: any;

  ngOnInit(): void {
    this.initChart();
  }

  initChart(): void {
    const categories = [
      'salariés', 'commerçant', 'gérant de société',
      'fonctionnaire', 'retraité', 'profession libérale',
      'MRE', 'Résident', 'ENR'
    ];

    const rawData = {
      'Crédit Immobilier': {
        montant:   [5262723, 6622633, 3322650, 1235000, 700000, 1236500, 5262723, 6622633, 3322650],
        taux:      [23, 28, 14, 5, 3, 5, 33, 32, 34],
        dossiers:  [2, 3, 2, 3, 1, 2, 2, 3, 2]
      },
      'Crédit Consommation': {
        montant:   [5262723, 6622633, 3322650, 1235000, 700000, 1236500, 0, 0, 0],
        taux:      [23, 28, 14, 5, 3, 5, 0, 0, 0],
        dossiers:  [2, 3, 2, 3, 1, 2, 0, 0, 0]
      },
      'Crédit Hypothécaire': {
        montant:   [3000000, 4200000, 1800000, 1200000, 700000, 1300000, 0, 0, 0],
        taux:      [12, 42, 18, 12, 7, 9, 0, 0, 0],
        dossiers:  [1, 4, 2, 1, 1, 2, 0, 0, 0]
      }
    };

    // Build chart data dynamically
    const creditTypes = Object.keys(rawData);
    const colors = ['#8ecae6', '#219ebc', '#ffb703'];

    this.combinedChartData = {
      labels: categories,
      datasets: creditTypes.map((creditType, i) => ({
        label: creditType,
        data: rawData[creditType].montant,
        backgroundColor: colors[i],
        meta: {
          taux: rawData[creditType].taux,
          dossiers: rawData[creditType].dossiers
        }
      }))
    };

    const css = getComputedStyle(document.documentElement);
    const textColor = css.getPropertyValue('--text-color') || '#000';
    const gridColor = css.getPropertyValue('--surface-border') || '#ccc';

    this.combinedChartOpts = {
      responsive: true,
      indexAxis: 'y', // horizontal bar
      plugins: {
        legend: {
          position: 'top',
          labels: { color: textColor }
        },
        tooltip: {
          callbacks: {
            label: (ctx: any) => {
              const label = ctx.dataset.label || '';
              const value = ctx.raw;
              const index = ctx.dataIndex;
              const taux = ctx.dataset.meta.taux[index];
              const dossiers = ctx.dataset.meta.dossiers[index];
              return `${label}: ${value.toLocaleString()} Dhs | ${taux}% | ${dossiers} dossier(s)`;
            }
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          ticks: { color: textColor },
          grid: { color: gridColor },
          title: {
            display: true,
            text: 'Montant (Dhs)',
            color: textColor
          }
        },
        y: {
          stacked: true,
          ticks: { color: textColor },
          grid: { color: gridColor }
        }
      }
    };
  }
}