import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Table } from 'primeng/table';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';

interface expandedRows {
  [key: string]: boolean;
}
@Component({
  selector: 'app-add-customer-file',
  templateUrl: './add-customer-file.component.html',
  styleUrl: './add-customer-file.component.scss'
})
export class AddCustomerFileComponent implements OnInit{

  items: any[]=[];
  activeIndex= 0;
  situations_familiales: SelectItem[] = [];
  civilites: SelectItem[] = [];
  coEmprunteur: string = 'non';
  showTab: boolean = false;
  caisses: SelectItem[] = [];

  customers1: Customer[] = [];
  customers2: Customer[] = [];
  customers3: Customer[] = [];
  selectedCustomers1: Customer[] = [];
  selectedCustomer: Customer = {};
  representatives: Representative[] = [];
  statuses: any[] = [];
  products: Product[] = [];
  rowGroupMetadata: any;
  expandedRows: expandedRows = {};
  activityValues: number[] = [0, 100];
  isExpanded: boolean = false;
  idFrozen: boolean = false;
  loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

  onCoEmprunteurChange(value: string): void {
    if (value === 'oui') {
      this.showTab = true; 
    } else {
      this.showTab = false;
    }
  }

  constructor(private customerService: CustomerService, private productService: ProductService
  ) 
  {
    
  }


  ngOnInit() {
    this.items = [
      {
          label: 'Données Personnelles',
      },
      {
          label: 'Renseignements Bancaires',
      },
      {
          label: 'Engagements Bancaires',
      },
      {
          label: 'Données Crédit',
      }
    ];

    this.situations_familiales = [
      { label: 'Célibataire', value: 1 },
      { label: 'Marié(e)', value: 2 },
      { label: 'Veuf(e)', value: 3 },
      { label: 'Divorcé(e)', value: 4 },
    ];

    this.civilites = [
      { label: 'M', value: 1 },
      { label: 'Mme', value: 2 },
      { label: 'Melle', value: 3 },
    ];

    this.caisses = [
      { label: 'CIMR', value: 1 },
      { label: 'CMR', value: 2 },
      { label: 'RCAR', value: 3 },
      { label: 'CNSS', value: 4 },
    ];

    this.customerService.getCustomersLarge().then(customers => {
      this.customers1 = customers;
      this.loading = false;

      // @ts-ignore
      this.customers1.forEach(customer => customer.date = new Date(customer.date));
  });

  this.representatives = [
    { name: 'Amy Elsner', image: 'amyelsner.png' },
    { name: 'Anna Fali', image: 'annafali.png' },
    { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
    { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
    { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
    { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
    { name: 'Onyama Limba', image: 'onyamalimba.png' },
    { name: 'Stephen Shaw', image: 'stephenshaw.png' },
    { name: 'XuXue Feng', image: 'xuxuefeng.png' }
];

this.statuses = [
    { label: 'Unqualified', value: 'unqualified' },
    { label: 'Qualified', value: 'qualified' },
    { label: 'New', value: 'new' },
    { label: 'Negotiation', value: 'negotiation' },
    { label: 'Renewal', value: 'renewal' },
    { label: 'Proposal', value: 'proposal' }
];

  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }
  
  onSort() {
    this.updateRowGroupMetaData();
}

updateRowGroupMetaData() {
    this.rowGroupMetadata = {};

    if (this.customers3) {
        for (let i = 0; i < this.customers3.length; i++) {
            const rowData = this.customers3[i];
            const representativeName = rowData?.representative?.name || '';

            if (i === 0) {
                this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
            }
            else {
                const previousRowData = this.customers3[i - 1];
                const previousRowGroup = previousRowData?.representative?.name;
                if (representativeName === previousRowGroup) {
                    this.rowGroupMetadata[representativeName].size++;
                }
                else {
                    this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
                }
            }
        }
    }
}

expandAll() {
    if (!this.isExpanded) {
        this.products.forEach(product => product && product.name ? this.expandedRows[product.name] = true : '');

    } else {
        this.expandedRows = {};
    }
    this.isExpanded = !this.isExpanded;
}

formatCurrency(value: number) {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
}
 
}
