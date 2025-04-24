import { Component } from '@angular/core';
import html2pdf from 'html2pdf.js';


@Component({
  selector: 'app-credit-immobilier',
  templateUrl: './credit-immobilier.component.html',
  styleUrl: './credit-immobilier.component.scss'
})
export class CreditImmobilierComponent {

  printPDF() {
    const element = document.getElementById('printable-div');
    html2pdf().from(element).save();
  }
}
