import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
  selector: 'app-customer-folder',
  templateUrl: './customer-folder.component.html',
  styleUrl: './customer-folder.component.scss'
})
export class CustomerFolderComponent implements OnInit{

  products: any[]=[];

  cities!: any[];
  selectedCity!: any;
  valueSlider : number = 0;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products = [
      { name: 'Idrissi Mohamed Ayoub', tel: '06988480',is_primary: true, tier_interv: 40 },
      { name: 'Oum kel', tel: '06988481',is_primary: false, tier_interv: 40 },
      { name: 'Othman Pren', tel: '06988482',is_primary: false, tier_interv: 20 },
    ]
    this.cities = [
        { name: 'Crédit immobilier', code: 'CIM' },
        { name: 'Crédit consommation', code: 'CC' },
        { name: 'Crédit hypothécaire', code: 'CH' },
        { name: 'Crédit-Bail Immobilier', code: 'CBI' },
        { name: 'Crédit-Bail Mobilier', code: 'CBM' },
        { name: 'Crédit à la promotion immobilière', code: 'CPI' },
        { name: 'Crédit d’investissement', code: 'CI' }
    ];
  }

  onCityChange(event: any): void {
    console.log('Selected city:', event.value); // Logs the selected city object
    console.log('selectedCity city:', this.selectedCity); // Logs the selected city object

  }

}
