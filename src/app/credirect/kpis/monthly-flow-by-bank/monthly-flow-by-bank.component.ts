import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monthly-flow-by-bank',
  templateUrl: './monthly-flow-by-bank.component.html',
  styleUrl: './monthly-flow-by-bank.component.scss'
})
export class MonthlyFlowByBankComponent implements OnInit {

  /* ──────── 1. RAW DATA (replace with real values) ──────── */
  private readonly data: Record<string, any> = {
    'banque 1': {
      months: ['janv','févr','mars','avr','mai','juin','juil','août','sept','oct','nov','déc'],
      depot:   [200, 384,1200,1500,1800,1490,1400,1250,1778,0,0,0],
      accord:  [174, 264, 960,1200,1440,1192,1120,1000, 625,0,0,0],
      debloc:  [174, 240, 240, 250, 250, 250, 240, 230, 100,0,0,0],
      convPct: [87, 69, 80, 80, 80, 80, 80, 80, 35, 0, 0, 0],
      transPct:[100,91,25,21,17,21,21,23,16,0,0,0]
    },
    'banque 2': { /* …same shape… */ } as any,
    'banque 3': { /* … */ } as any,
    'banque 4': { /* … */ } as any
  };

  /* ──────── 2. DROPDOWN ──────── */
  bankOptions = Object.keys(this.data).map(key => ({ label: key, value: key }));
  selectedBank = this.bankOptions[0];        // default selection

  /* ──────── 3. CHART OBJECTS ──────── */
  chartData: any;  // set by buildChart()
  chartOpts: any;

  ngOnInit(): void {
    this.initOptions();
    this.buildChart();
  }

  /** Build chart options (once, theme‑aware). */
  private initOptions(): void {
    const css = getComputedStyle(document.documentElement);
    const text    = css.getPropertyValue('--text-color');
    const textSec = css.getPropertyValue('--text-color-secondary');
    const grid    = css.getPropertyValue('--surface-border');

    this.chartOpts = {
      responsive:true,
      interaction:{ mode:'index', intersect:false },
      plugins:{ legend:{ labels:{ color:text } } },
      scales:{
        y :{ beginAtZero:true, ticks:{ color:textSec } },
        y1:{ position:'right', beginAtZero:true,
             ticks:{ callback:v=>v+' %', color:textSec },
             grid:{ drawOnChartArea:false } },
        x :{ ticks:{ color:textSec }, grid:{ color:grid } }
      }
    };
  }

  /** Re‑build chartData whenever the selected bank changes. */
  buildChart(): void {
    const kpi = this.data[this.selectedBank.value];

    this.chartData = {
      labels: kpi.months,
      datasets: [
        { type:'bar',  label:'Dépôts',     data:kpi.depot,   backgroundColor:'#219ebc' },
        { type:'bar',  label:'Accords',    data:kpi.accord,  backgroundColor:'#8ecae6' },
        { type:'bar',  label:'Déblocages', data:kpi.debloc,  backgroundColor:'#ffb703' },
        { type:'line', label:'% conversion',     data:kpi.convPct,
          borderColor:'#fb8500', yAxisID:'y1', tension:.3 },
        { type:'line', label:'% transformation', data:kpi.transPct,
          borderColor:'#ff706a', yAxisID:'y1', tension:.3 }
      ]
    };
  }
}