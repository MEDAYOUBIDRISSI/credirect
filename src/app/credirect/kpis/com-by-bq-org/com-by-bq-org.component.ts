import { Component, OnInit } from '@angular/core';

// interface Point { bank: string; x: number; y: number; r: number; }
// interface BarBank { bank: string; dossiers: number; product: string; }

@Component({
  selector: 'app-com-by-bq-org',
  templateUrl: './com-by-bq-org.component.html',
  styleUrl: './com-by-bq-org.component.scss'
})
export class ComByBqOrgComponent implements OnInit {

  
  /* ---------------  CHART DATA  --------------- */
  bubbleData: any; bubbleOpts: any;
  barData:    any; barOpts:    any;

  ngOnInit(): void {

    /* ╭──────────────────────────────────────────╮
       │ 1.  RAW NUMBERS  (replace with real data) │
       ╰──────────────────────────────────────────╯ */

    const immo:  any[] = [
      { bank:'CDM',    x:15.8732, y:158.732, r:14 },   // 7 dossiers ×2
      { bank:'SG',     x:52.2483, y:522.483, r:78 },   // 39 dossiers ×2
      { bank:'BMCI',   x:17.9482, y:233.289, r:20 },   // 10
      { bank:'NAJMAH', x: 4.4100, y: 44.100, r: 4 },   // 2
      { bank:'CFG',    x: 3.5000, y: 35.000, r: 2 },   // 1
      { bank:'BP',     x: 4.5000, y: 54.000, r: 2 }    // 1
    ];

    const conso: any[] = [
      { bank:'SOFAC',      x: 7.7088, y:113.886, r:18 }, // 9 dossiers
      { bank:'WAFA SALAF', x: 0.4935, y: 11.985, r: 6 }, // 3
      { bank:'EQDOM',      x: 0.4556, y:  5.256, r: 4 }  // 2
    ];

    const hypo:  any[] = [
      { bank:'SOFAC', x: 8.9210, y:146.253, r:20 }       // 10 dossiers
    ];

    /* --------------- 1.  BUBBLE CHART --------------- */
    this.bubbleData = {
      datasets: [
        { label:'Crédit Immo',  data:immo,
          backgroundColor:'rgba(33,158,188,0.5)', borderColor:'rgba(33,158,188,1)' },
        { label:'Crédit Conso', data:conso,
          backgroundColor:'rgba(255,183,3,0.5)',  borderColor:'rgba(255,183,3,1)' },
        { label:'Hypothèque',   data:hypo,
          backgroundColor:'rgba(255,112,106,0.5)',borderColor:'rgba(255,112,106,1)' }
      ]
    };

    /* --------------- 2.  BAR CHART (dossiers) --------------- */

    // Flatten points into a simpler array
    const dossierRows: any[] = [
      ...immo.map(p => ({ bank:p.bank, dossiers:p.r/2, product:'Crédit Immo'  })),
      ...conso.map(p => ({ bank:p.bank, dossiers:p.r/2, product:'Crédit Conso' })),
      ...hypo.map(p => ({ bank:p.bank, dossiers:p.r/2, product:'Hypothèque'   }))
    ];

    // Unique bank list (sorted by descending dossiers total)
    const banks = [...new Set(dossierRows.map(r => r.bank))];
    banks.sort((a,b) => {
      const tot = (bank:string)=>dossierRows.filter(r=>r.bank===bank)
                                            .reduce((s,r)=>s+r.dossiers,0);
      return tot(b) - tot(a);
    });

    const palette = { 'Crédit Immo':'#219ebc', 'Crédit Conso':'#ffb703', 'Hypothèque':'#ff706a' };

    // Build stacked‑bar datasets (one per product family)
    const products = Object.keys(palette);
    this.barData = {
      labels: banks,
      datasets: products.map(prod => ({
        label: prod,
        data: banks.map(bk => {
          const row = dossierRows.find(r => r.bank===bk && r.product===prod);
          return row ? row.dossiers : 0;
        }),
        backgroundColor: palette[prod]
      }))
    };

    /* --------------- 3.  SHARED OPTIONS --------------- */
    const css     = getComputedStyle(document.documentElement);
    const text    = css.getPropertyValue('--text-color');
    const textSec = css.getPropertyValue('--text-color-secondary');
    const grid    = css.getPropertyValue('--surface-border');

    this.bubbleOpts = {
      responsive:true,
      plugins:{
        legend:{ labels:{ color:text } },
        tooltip:{
          callbacks:{
            label: ctx => {
              const d = ctx.raw as any;
              return `${d.bank}:  ${d.x.toFixed(2)} M  •  ${d.y.toFixed(1)} k  •  ${d.r/2} dossiers`;
            }
          }
        }
      },
      scales:{
        x:{ title:{display:true,text:'Montant (millions MAD)',color:text},
            ticks:{color:textSec}, grid:{color:grid} },
        y:{ title:{display:true,text:'Commission HT Banque (k MAD)',color:text},
            ticks:{color:textSec}, grid:{color:grid} }
      }
    };

    this.barOpts = {
      responsive:true,
      indexAxis:'y',         // horizontal bars
      scales:{
        x:{ stacked:true, beginAtZero:true, ticks:{ color:textSec }, grid:{ color:grid } },
        y:{ stacked:true, ticks:{ color:textSec }, grid:{ display:false } }
      },
      plugins:{ legend:{ labels:{ color:text } } }
    };
  }
}