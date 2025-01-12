import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
  selector: 'app-customer-folder',
  templateUrl: './customer-folder.component.html',
  styleUrl: './customer-folder.component.scss'
})
export class CustomerFolderComponent implements OnInit{

  products!: Product[];

  cities!: any[];
  selectedCity!: any;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProductsSmall().then(data => this.products = data);
    this.cities = [
        { name: 'Crédit immobilier', code: 'NY' },
        { name: 'Crédit consommation', code: 'RM' },
        { name: 'Crédit hypothécaire', code: 'LDN' },
        { name: 'Crédit-Bail Immobilier ', code: 'IST' },
        { name: 'Crédit-Bail Mobilier ', code: 'PRS' },
        { name: 'Crédit à la promotion immobilière  ', code: 'IST' },
        { name: 'Crédit d’investissement  ', code: 'IST' }
    ];
  }

}
