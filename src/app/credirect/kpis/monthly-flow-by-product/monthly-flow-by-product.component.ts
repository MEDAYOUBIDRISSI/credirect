import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

/** Optional aliases for readability */
type BarOpts  = ChartConfiguration<'bar'>['options'];
type LineOpts = ChartConfiguration<'line'>['options'];
type PieOpts  = ChartConfiguration<'pie'>['options'];

@Component({
  selector: 'app-monthly-flow-by-product',
  templateUrl: './monthly-flow-by-product.component.html',
  styleUrl: './monthly-flow-by-product.component.scss'
})

export class MonthlyFlowByProductComponent implements OnInit{

   /* ────────────────────────────────────────────────────────────
     Replace every array below with the real values you parse
     from your Excel sheet. All arrays MUST have 12 numbers
     (one per month) except where noted.
  ──────────────────────────────────────────────────────────── */
  months = ['janv','févr','mars','avr','mai','juin','juil','août','sept','oct','nov','déc'];

  /* ------- Crédit consommation (funnel) ------- */
  consoDepot      = [60,50,40,55,70,65,75,68,60,58,62,70];
  consoAccord     = [25,20,18,28,32,30,40,38,32,31,30,35];
  consoDeblocage  = [20,15,10,22,28,25,35,32,25,24,26,30];

  /* ------- Crédit hypothécaire (funnel) ------- */
  hypoDepot      = [30,25,22,33,45,40,50,48,44,43,45,50];
  hypoAccord     = [12,10, 9,15,18,16,20,19,17,16,17,19];
  hypoDeblocage  = [ 9, 7, 6,12,15,13,17,16,14,13,14,15];

  /* ------- Stacked mix (dépôt only) ------- */
  mixSeries = {
    'Crédit conso':   this.consoDepot,
    'Crédit immo':    [28,24,20,30,42,38,47,45,41,40,42,46],
    'Crédit hypoth.': this.hypoDepot,
    'Mourabaha':      [10, 8, 7,12,15,13,17,16,14,13,14,15]
  };

  /* ------- Efficiency (%) ------- */
  convPct = { 'Crédit conso':50, 'Crédit immo':47, 'Crédit hypoth.':44, 'Mourabaha':38 };
  transPct= { 'Crédit conso':82, 'Crédit immo':78, 'Crédit hypoth.':74, 'Mourabaha':70 };

  /* ====== Chart objects initialised in ngOnInit() ====== */
  consoFunnel: any; hypoFunnel: any; funnelOpts: any;
  mixByMonth:  any; mixOpts:     any;
  depotShare:  any; doughnutOpts:any;
  efficiencyRadar:any; radarOpts:any;
  totalsTrend: any; lineOpts:   any;

  ngOnInit(): void {
    const css = getComputedStyle(document.documentElement);
    const text     = css.getPropertyValue('--text-color');
    const textSec  = css.getPropertyValue('--text-color-secondary');

    /* ---------- 1 & 2  Combo funnel builder ---------- */
    const buildFunnel = (depot:number[], accord:number[], debloc:number[]) => ({
      labels: this.months,
      datasets: [
        { type:'bar',  label:'Dépôt',      data:depot,   backgroundColor:'#ffb703' },
        { type:'bar',  label:'Accord',     data:accord,  backgroundColor:'#fb8500' },
        { type:'bar',  label:'Déblocage',  data:debloc,  backgroundColor:'#219ebc' },
        { type:'line', label:'% conversion',     data: accord.map((v,i)=>Math.round(v/depot[i]*100)),
          borderColor:'#023047', yAxisID:'y1', tension:.3 },
        { type:'line', label:'% transformation', data: debloc.map((v,i)=>Math.round(v/accord[i]*100)),
          borderColor:'#8ecae6', yAxisID:'y1', tension:.3 }
      ]
    });

    this.consoFunnel = buildFunnel(this.consoDepot, this.consoAccord, this.consoDeblocage);
    this.hypoFunnel  = buildFunnel(this.hypoDepot,  this.hypoAccord,  this.hypoDeblocage);

    this.funnelOpts = {
      responsive:true,
      interaction:{mode:'index', intersect:false},
      plugins:{ legend:{ labels:{ color:text } } },
      scales:{
        y :{ beginAtZero:true, ticks:{ color:textSec } },
        y1:{ position:'right', beginAtZero:true,
             ticks:{ callback:v=>v+' %', color:textSec },
             grid:{ drawOnChartArea:false } }
      }
    };

    /* ---------- 3  Stacked mix ---------- */
    const palette = ['#ffb703','#fb8500','#219ebc','#8ecae6','#ff9770','#e9ff70'];
    this.mixByMonth = {
      labels: this.months,
      datasets: Object.entries(this.mixSeries).map(([label, data], i)=>({
        label, data, backgroundColor: palette[i%palette.length]
      }))
    };
    this.mixOpts = {
      responsive:true,
      plugins:{ legend:{ labels:{ color:text } } },
      scales:{
        x:{ stacked:true, ticks:{ color:textSec } },
        y:{ stacked:true, beginAtZero:true, ticks:{ color:textSec } }
      }
    };

    /* ---------- 4  Doughnut share ---------- */
    const products = Object.keys(this.mixSeries);
    const share = products.map(p=> this.mixSeries[p].reduce((s,v)=>s+v,0));
    this.depotShare = {
      labels: products,
      datasets:[{ data:share, backgroundColor:palette }]
    };
    this.doughnutOpts = {
      plugins:{ legend:{ position:'right', labels:{ color:text } } }
    };

    /* ---------- 5  Efficiency radar ---------- */
    this.efficiencyRadar = {
      labels: products,
      datasets:[
        { label:'% conversion',     data:products.map(p=>this.convPct[p]),  borderColor:'#ffb703', backgroundColor:'rgba(255,183,3,.3)' },
        { label:'% transformation', data:products.map(p=>this.transPct[p]), borderColor:'#219ebc', backgroundColor:'rgba(33,158,188,.3)' }
      ]
    };
    this.radarOpts = {
      plugins:{ legend:{ labels:{ color:text } } },
      scales:{ r:{ beginAtZero:true, max:100,
                   ticks:{ color:textSec, callback:v=>v+' %' } } }
    };

    /* ---------- 6  Global totals line ---------- */
    const totDepot     = this.months.map((_,i)=> products.reduce((s,p)=>s+this.mixSeries[p][i],0));
    const totDeblocage = this.months.map((_,i)=> Math.round(totDepot[i]*0.4)); // dummy ratio, replace

    this.totalsTrend = {
      labels: this.months,
      datasets:[
        { label:'Total Dépôt',     data:totDepot,     borderColor:'#ffb703', fill:false, tension:.3 },
        { label:'Total Déblocage', data:totDeblocage, borderColor:'#219ebc', fill:false, tension:.3 }
      ]
    };
    this.lineOpts = {
      plugins:{ legend:{ labels:{ color:text } } },
      scales:{
        x:{ ticks:{ color:textSec } },
        y:{ beginAtZero:true, ticks:{ color:textSec } }
      }
    };
  }
}
