import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-banking-informations',
  templateUrl: './banking-informations.component.html',
  styleUrl: './banking-informations.component.scss'
})
export class BankingInformationsComponent implements OnInit {
  customers!: any[];

  representatives!: any[];

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  searchValue: string | undefined;

  items: any[] | undefined;

  constructor(
              private customerService: CustomerService
            ) 
            {

            }

  ngOnInit() {
      this.customerService.getCustomersLarge().then((customers) => {
          this.customers = customers;
          this.loading = false;

          this.customers.forEach((customer) => (customer.date = new Date(<Date>customer.date)));
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
          { name: 'Xuxue Feng', image: 'xuxuefeng.png' }
      ];

      this.statuses = [
          { label: 'Unqualified', value: 'unqualified' },
          { label: 'Qualified', value: 'qualified' },
          { label: 'New', value: 'new' },
          { label: 'Negotiation', value: 'negotiation' },
          { label: 'Renewal', value: 'renewal' },
          { label: 'Proposal', value: 'proposal' }
      ];

      this.items = [
        {
            icon: 'pi pi-pencil',
            command: () => {
                //Do somthing
            }
        },
        {
            icon: 'pi pi-refresh',
            command: () => {
                
            }
        },
        {
            icon: 'pi pi-trash',
            command: () => {
              
            }
        },
        {
            icon: 'pi pi-upload',
            routerLink: ['/fileupload']
        },
        {
            icon: 'pi pi-external-link',
            target: '_blank',
            url: 'http://angular.io'
        }
    ];
  }

  clear(table: Table) {
      table.clear();
      this.searchValue = ''
  }

  getSeverity(status: string) {
      switch (status.toLowerCase()) {
          case 'unqualified':
              return 'danger';

          case 'qualified':
              return 'success';

          case 'new':
              return 'info';

          case 'negotiation':
              return 'warning';

          case 'renewal':
              return null;
          default:
              return null;
      }
  }
}
