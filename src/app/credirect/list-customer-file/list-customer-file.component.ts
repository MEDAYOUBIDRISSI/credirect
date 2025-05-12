import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-list-customer-file',
  templateUrl: './list-customer-file.component.html',
  styleUrls: ['./list-customer-file.component.scss'],
  providers: [ConfirmationService]
})
export class ListCustomerFileComponent implements OnInit {
  customers: any[] = [];
  filteredCustomers: any[] = [];
  loading: boolean = true;
  searchValue: string = '';
  displayDeleteConfirmation: boolean = false;
  customerToDelete: any = null;
  deleteLoading: boolean = false;
  private searchSubject = new Subject<string>();

  // For filters
  maritalStatuses = [
    { label: 'Célibataire', value: 'Célibataire' },
    { label: 'Marié', value: 'Marié' },
    { label: 'Divorcé', value: 'Divorcé' },
    { label: 'Veuf', value: 'Veuf' }
  ];

  countries = [
    { label: 'Maroc', value: 'Maroc' },
    { label: 'France', value: 'France' }
  ];

  constructor(
    private customerService: CustomerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCustomers();
    
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchText => {
      this.applyFilter(searchText);
    });
  }

  loadCustomers() {
    this.loading = true;
    this.customerService.getAllClients().subscribe({
      next: (response) => {
        this.customers = response;
        this.filteredCustomers = [...this.customers];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading customers:', error);
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Échec du chargement des clients'
        });
      }
    });
  }

  applyFilter(searchText: string): void {
    if (!searchText) {
      this.filteredCustomers = [...this.customers];
      return;
    }
    
    searchText = searchText.toLowerCase();
    this.filteredCustomers = this.customers.filter(customer => 
      (customer.mobilePhone && customer.mobilePhone.toLowerCase().includes(searchText)) ||
      (customer.email && customer.email.toLowerCase().includes(searchText)) ||
      (customer.cin && customer.cin.toLowerCase().includes(searchText)) ||
      (customer.is_organisation && customer.managers?.some(manager => 
        manager.managerInformation?.cin && manager.managerInformation.cin.toLowerCase().includes(searchText)
      )
    ));
  }

  onSearchInput(event: any): void {
    this.searchSubject.next(event.target.value);
  }

  getCountryCode(country: any): string {
    if (!country) return 'ma';
    return country.clientCountryLabel === 'Maroc' ? 'ma' :
      country.clientCountryLabel === 'France' ? 'fr' : 'ma';
  }

  getMaritalStatusSeverity(status: string): string {
    switch(status) {
      case 'Marié': return 'success';
      case 'Célibataire': return 'info';
      case 'Divorcé': return 'warning';
      case 'Veuf': return 'danger';
      default: return 'info';
    }
  }

  getClientType(client: any): string {
    if (client.is_individual) return 'Particulier';
    if (client.is_organisation) return 'Entreprise';
    return 'Inconnu';
  }

  clearFilters(table: Table) {
    table.clear();
    this.searchValue = '';
    this.filteredCustomers = [...this.customers];
  }

  viewCustomer(customer: any) {
    if (customer?.clientID) {
      this.router.navigate(['/credirect/customer/add', 2, customer.clientID]);
    }
  }

  editCustomer(customer: any) {
    if (customer?.clientID) {
      this.router.navigate(['/credirect/customer/add', 2, customer.clientID]);
    }
  }

  showDeleteConfirmation(customer: any) {
    this.customerToDelete = customer;
    this.displayDeleteConfirmation = true;
  }
  
  hideDeleteConfirmation() {
    this.displayDeleteConfirmation = false;
    this.customerToDelete = null;
  }
  
  confirmDelete() {
    if (!this.customerToDelete) return;
  
    this.deleteLoading = true;
    this.customerService.deleteClient(this.customerToDelete.clientID).subscribe({
      next: () => {
        this.deleteLoading = false;
        this.displayDeleteConfirmation = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Client supprimé avec succès'
        });
        this.loadCustomers();
      },
      error: (error) => {
        this.deleteLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Échec de la suppression du client'
        });
      }
    });
  }
}