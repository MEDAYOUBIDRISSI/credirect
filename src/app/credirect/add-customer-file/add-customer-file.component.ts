import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Table } from 'primeng/table';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Router, ActivatedRoute } from '@angular/router';

interface expandedRows {
  [key: string]: boolean;
}

// interface Role {
//   name: string,
//   code: string
// }

@Component({
  selector: 'app-add-customer-file',
  templateUrl: './add-customer-file.component.html',
  styleUrl: './add-customer-file.component.scss'
})
export class AddCustomerFileComponent implements OnInit {
  // Properties
  customerId?: any;
  LastName?: any;
  FirstName?: any;
  BirthDate?: any;
  Nationality?: any;
  IdentityID?: number;
  CIN?: any;
  carteSejour?: any;
  PassportNumber?: any;
  Email?: any;
  Address?: any;
  City?: any;
  CountryID?: any;
  ResidenceCountryID?: any;
  MaritalStatusID?: any;
  id_ProvenanceClient?: any;
  id_FormeJuridique?: any;
  id_Activite?: any;
  id_Civilite?: any;
  id_Caisse?: any;
  id_Statut?: any;
  id_StatutOccupation?: any;
  id_Representant?: any;
  Matricule?: any;
  MobilePhone?: any;
  LandlinePhone?: any;
  WorkPhone?: any;
  ResidencyStatusID?: any;
  IsOwner?: any;
  IsTenant?: any;
  RequestedAmount?: any;
  CompanyName?: any;
  LegalForm?: any;
  CreationDate?: any;
  RegistrationNumber?: any;
  CompanyAddress?: any;
  CompanyCity?: any;
  CompanyCountryID?: any;
  SocialCapital?: any;
  BusinessActivityID?: any;
  is_individual:any;
  is_organisation: any;
  RoleID: any;
  ResidencePermit: any;
  OriginID: any;
  originDetails: any;
  ClientTitleID: any;

  managers: any[] = [{
    managerLastName: '',
    managerFirstName: '',
    managerBirthDate: '',
    managerNationality: '',
    id_Identity: 0,
    cin: '',
    carteSejour: '',
    passeport: '',
    managerAddress: '',
    managerCity: '',
    managerCountryID: 0,
    managerResidenceCountryID: 0,
    id_ManagerMaritalStatus: 0
  }];

  items: any[] = [];
  activeIndex = 0;
  situations_familiales: SelectItem[] = [];
  provenances_clients: SelectItem[] = [];
  formes_juridiques: SelectItem[] = [];
  business_activities: SelectItem[] = [];
  civilites: SelectItem[] = [];
  coEmprunteur: string = 'non';
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
  isExpanded: boolean = false;
  idFrozen: boolean = false;
  loading: boolean = true;

  isSelected1 = false;
  isSelected2 = false;
  step = 0;

  titles: any[] = [];
  roles: any[] = [];
  maritalStatuses: any[] = [];
  legalForms: any[] = [];
  businessActivities: any[] = [];
  clientOrigins: any[] = [];

  selectedTitle: any;
  selectedRole: any;
  selectedMaritalStatus: any;
  selectedLegalForm: any;
  selectedBusinessActivity: any;
  selectedClientOrigin: any; 

  selectedIdentity: any = null;
  selectedIdentity2: any = null;

  identities: any[] = [
    { name: 'CIN', key: 'A' },
    { name: 'Carte Séjour', key: 'B' },
    { name: 'Passeport', key: 'C' },
  ];

  identities2: any[] = [
    { name: 'CIN', key: 'A' },
    { name: 'Carte Séjour', key: 'B' },
    { name: 'Passeport', key: 'C' },
  ];

  selectedStatut: any = null;
  statuts: any[] = [
    { name: 'Résident', key: 'A' },
    { name: 'MRE', key: 'B' },
    { name: 'ENR', key: 'C' },
  ];

  selectedStatut_Occupation: any = null;
  statuts_Occupation: any[] = [
    { name: 'Propriétaire', key: 'A' },
    { name: 'Locataire', key: 'B' },
  ];

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    if (this.route.snapshot.paramMap.get('customerId')) {
      this.customerId = this.route.snapshot.paramMap.get('customerId');
    }
  }

  ngOnInit() {

    this.loadLookups();

    this.route.params.subscribe((params) => {
      const stepFromUrl = +params['step'];
      const customerIdFromUrl = params['customerId'];
      
      if (!isNaN(stepFromUrl)) {  
        this.step = stepFromUrl;
        this.activeIndex = this.step > 1 ? this.step - 2 : 0;
      }
      
      if (customerIdFromUrl) {
        this.customerId = customerIdFromUrl;
      }
      
      this.cdr.detectChanges();
    });

    this.initializeDropdowns();

    this.customerService.getCustomersLarge().then(customers => {
      this.customers1 = customers;
      this.loading = false;
      this.customers1.forEach(customer => customer.date = new Date(customer.date).toISOString());
    });  }

  // Component Methods
  isNextDisabled(): boolean {
    return (this.step == 0 && !this.isSelected1 && !this.isSelected2) || 
           (this.step == 1 && !this.selectedRole);
  }

  selectCard(cardNumber: number) {
    this.isSelected1 = cardNumber === 1;
    this.isSelected2 = cardNumber === 2;
    
    if (cardNumber === 1) {
      this.items = [
        { label: 'Informations générales' },
        { label: 'Informations détaillées' },
        { label: "Zone d'implantation" }
      ];
    } else if (cardNumber === 2) {
      this.items = [
        { label: 'Informations générales' },
        { label: 'Informations détaillées' },
        { label: "Gérant/Manager" }
      ];
    }
  }

  goToPreviousStep() {
    if (this.step > 0) {
      this.step--;
      this.activeIndex = this.step - 2;
      this.updateUrl();
    }
  }

  goToNextStep() {
    if (this.step < 6) {
      this.step++;
      this.activeIndex = this.step - 2;
      this.updateUrl();
    }
  }

  private updateUrl(): void {
    this.router.navigate(['/credirect/customer/add/' + this.step + '/' + this.customerId]);
    this.cdr.detectChanges();
  }

  addManager() {
    this.managers.push({
      managerLastName: '',
      managerFirstName: '',
      managerBirthDate: '',
      managerNationality: '',
      id_Identity: 0,
      cin: '',
      carteSejour: '',
      passeport: '',
      managerAddress: '',
      managerCity: '',
      managerCountryID: 0,
      managerResidenceCountryID: 0,
      id_ManagerMaritalStatus: 0
    });
  }

  removeManager(index: number) {
    this.managers.splice(index, 1);
  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
    this.step = event + 2;
    this.updateUrl();
  }

  // Data Methods
  private initializeDropdowns() {

    this.selectedIdentity = this.identities[0];
    this.selectedIdentity2 = this.identities2[0];
    this.selectedStatut = this.statuts[0];
    this.selectedStatut_Occupation = this.statuts_Occupation[0];
  }

  // Table Methods
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
        } else {
          const previousRowData = this.customers3[i - 1];
          const previousRowGroup = previousRowData?.representative?.name;
          if (representativeName === previousRowGroup) {
            this.rowGroupMetadata[representativeName].size++;
          } else {
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

  // Data Submission
  submitClientData(): Promise<any> {
    const clientData = {
      ClientID: this.customerId ? this.customerId : null,
      is_individual : this.isSelected1,
      is_organisation : this.is_organisation,
      RoleID: this.selectedRole?.value || null,
      LastName: this.LastName,
      FirstName: this.FirstName,
      BirthDate: this.BirthDate,
      ClientTitleID: this.selectedTitle?.value || null,
      Nationality : this.Nationality,
      Email : this.Email,
      CIN : this.CIN,
      ResidencePermit : this.ResidencePermit,
      PassportNumber : this.PassportNumber,
      City : this.City,
      CountryID : this.CountryID,
      ResidenceCountryID : this.ResidenceCountryID,
      MaritalStatusID : this.selectedMaritalStatus?.value || null,
      MobilePhone : this.MobilePhone,
      LandlinePhone : this.LandlinePhone,
      WorkPhone : this.WorkPhone,
      Address: this.Address,

      IsOwner : this.IsOwner,
      sTenant: this.IsTenant,
      RequestedAmount : this.RequestedAmount,
      OriginID : this.selectedClientOrigin?.value || null,
      originDetails : this.originDetails,

      LegalFormID : this.selectedLegalForm?.value || null,
    };
  
    return new Promise((resolve, reject) => {
      this.customerService.createOrUpdateClient(clientData).subscribe({
        next: (response) => {
          console.log('Client data submitted successfully', response);
          this.customerId = response;
          resolve(response);
        },
        error: (err) => {
          console.error('Error submitting client data', err);
          reject(err);
        }
      });
    });
  }
  
  async onNextClick() {
    try {
      await this.submitClientData();
      this.goToNextStep();
    } catch (error) {
      console.error('Error submitting client data:', error);
    }
  }

  loadLookups() {
    this.customerService.getClientRoles().subscribe(roles => {
      this.roles = roles.map(role => ({
        label: role.roleLabel,
        value: role.roleID
      }));
    });

    this.customerService.getClientTitles().subscribe({
      next: (titles) => {
        this.titles = titles.map(t => ({
          label: t.clientTitleLabel,
          value: t.clientTitleID
        }));
      }
    });

  this.customerService.getMaritalStatuses().subscribe(statuses => {
    this.maritalStatuses = statuses.map(status => ({
      label: status.maritalStatusLabel,
      value: status.maritalStatusID    
    }));
  });

  this.customerService.getLegalForms().subscribe(forms => {
    this.legalForms = forms.map(form => ({
      label: form.legalFormLabel,      
      value: form.legalFormID          
    }));
  });

  this.customerService.getBusinessActivities().subscribe(activities => {
    this.businessActivities = activities.map(activity => ({
      label: activity.businessActivityLabel,
      value: activity.businessActivityID    
    }));
  });

  this.customerService.getClientOrigins().subscribe(origins => {
    this.clientOrigins = origins.map(origin => ({
      label: origin.originLabel, 
      value: origin.originID      
    }));
  });
  }
}