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
  customerId: string | null = null;
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
  OriginDetails: any;
  ClientTitleID: any;

  managers: any[] = [{
    ManagerTitleID: null,         
    ManagerLastName: '',           
    ManagerFirstName: '',          
    ManagerBirthDate: '',         
    ManagerNationality: '',       
    Id_Identity: null,             
    CIN: '',                       
    CarteSejour: '',               
    Passeport: '',                
    Id_ManagerMaritalStatus: null, 
    ManagerCity: '',               
    ManagerCountryID: null,        
    ManagerResidenceCountryID: null, 
    ManagerAddress: ''            
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
  countries: any[] = [];
  residenceCountries: any[] = [];
  companyCountries: any[] = [];
  residencyStatuses: any[] = [];
  identities: any;

  selectedTitle: any;
  selectedRole: any;
  selectedMaritalStatus: any;
  selectedLegalForm: any;
  selectedBusinessActivity: any;
  selectedClientOrigin: any; 
  selectedCountry: any; 
  selectedResidenceCountry: any; 
  selectedCompanyCountry: any; 
  selectedResidencyStatus: any;
  selectedIdentity: any = null;
  selectedIdentity2: any = null;

  // identities: any[] = [
  //   { name: 'CIN', key: 'A' },
  //   { name: 'Carte Séjour', key: 'B' },
  //   { name: 'Passeport', key: 'C' },
  // ];

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
    
    // Always maintain customerId from URL, even if it's "0"
    this.customerId = customerIdFromUrl || this.customerId;
    
    this.cdr.detectChanges();
  });


    // this.initializeDropdowns();

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
      this.isSelected1 = true;
      this.isSelected2 = false;
      this.items = [
        { label: 'Informations générales' },
        { label: 'Informations détaillées' },
        { label: "Zone d'implantation" }
      ];
    } else if (cardNumber === 2) {
      this.isSelected2 = true;
      this.isSelected1 = false;
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
    const urlParts = ['/credirect/customer/add', this.step.toString()];
  if (this.customerId !== undefined && this.customerId !== null) {
    urlParts.push(this.customerId.toString());
  }
  
  this.router.navigate(urlParts).then(() => {
    this.cdr.detectChanges();
  });
  }

  addManager() {
    this.managers.push({
      ManagerTitleID: null,         
      ManagerLastName: '',           
      ManagerFirstName: '',          
      ManagerBirthDate: '',         
      ManagerNationality: '',       
      Id_Identity: null,             
      CIN: '',                       
      CarteSejour: '',               
      Passeport: '',                
      Id_ManagerMaritalStatus: null, 
      ManagerCity: '',               
      ManagerCountryID: null,        
      ManagerResidenceCountryID: null, 
      ManagerAddress: ''  
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

  updateOccupationStatus(): void {
    if (this.selectedStatut_Occupation) {
      this.IsOwner = this.selectedStatut_Occupation.key === 'A';
      this.IsTenant = this.selectedStatut_Occupation.key === 'B';
    } else {
      this.IsOwner = false;
      this.IsTenant = false;
    }
  }
// Data Submission
submitClientData(): Promise<any> {

  const clientId = this.customerId && this.customerId !== '0' ? this.customerId : null;

  // Filter out empty or unmodified managers
  const nonEmptyManagers = this.managers.filter(manager => {
    return manager.ManagerLastName.trim() !== '' || 
           manager.ManagerFirstName.trim() !== '' ||
           manager.CIN.trim() !== '' ||
           manager.Passeport.trim() !== '' ||
           manager.CarteSejour.trim() !== '' ||
           manager.ManagerTitleID !== null ||
           manager.Id_Identity !== null ||
           manager.Id_ManagerMaritalStatus !== null;
  });

  // Format non-empty managers with correct structure
  const formattedManagers = nonEmptyManagers.map(manager => ({
    ManagerInformation: {
      ManagerTitleID: manager.ManagerTitleID?.value || null,
      ManagerLastName: manager?.ManagerLastName,
      ManagerFirstName: manager?.ManagerFirstName,
      ManagerBirthDate: manager?.ManagerBirthDate,
      ManagerNationality: manager?.ManagerNationality,
      Id_Identity: manager?.Id_Identity?.key === 'A' ? 1 : 
                  manager?.Id_Identity?.key === 'B' ? 2 : 
                  manager?.Id_Identity?.key === 'C' ? 3 : null,
      CIN: manager?.CIN,
      CarteSejour: manager?.CarteSejour,
      Passeport: manager?.Passeport,
      ManagerAddress: manager?.ManagerAddress,
      ManagerCity: manager?.ManagerCity,
      ManagerCountryID: manager.ManagerCountryID?.value || null,
      ManagerResidenceCountryID: manager.ManagerResidenceCountryID?.value || null,
      Id_ManagerMaritalStatus: manager.Id_ManagerMaritalStatus?.value || null,
    }
  }));

  const clientData = {
      ClientID: clientId,
      is_individual: this.isSelected1,
      is_organisation: this.isSelected2,
      RoleID: this.selectedRole?.value || null,
      LastName: this.LastName,
      FirstName: this.FirstName,
      BirthDate: this.BirthDate,
      ClientTitleID: this.selectedTitle?.value || null,
      Nationality: this.Nationality,
      Email: this.Email,
      CIN: this.CIN,
      ResidencePermit: this.ResidencePermit,
      PassportNumber: this.PassportNumber,
      City: this.City,
      CountryID: this.selectedCountry?.value || null,
      ResidenceCountryID: this.selectedResidenceCountry?.value || null,
      MaritalStatusID: this.selectedMaritalStatus?.value || null,
      MobilePhone: this.MobilePhone,
      LandlinePhone: this.LandlinePhone,
      WorkPhone: this.WorkPhone,
      Address: this.Address,
      IdentityID: this.selectedIdentity?.value || null,
      IsOwner: this.IsOwner,
      IsTenant: this.IsTenant,
      RequestedAmount: this.RequestedAmount,
      OriginID: this.selectedClientOrigin?.value || null,
      OriginDetails: this.OriginDetails,
      CompanyName: this.CompanyName,
      RegistrationNumber: this.RegistrationNumber,
      SocialCapital: this.SocialCapital,
      CreationDate: this.CreationDate,
      CompanyAddress: this.CompanyAddress,
      CompanyCity: this.CompanyCity,
      CompanyCountryID: this.selectedCompanyCountry?.value || null,
      BusinessActivityID: this.selectedBusinessActivity?.value || null,
      ResidencyStatusID: this.selectedResidencyStatus?.value || null,
      LegalFormID: this.selectedLegalForm?.value || null,
      ClientManagers: this.isSelected2 && nonEmptyManagers.length > 0 ? formattedManagers : []   
    };

    // console.log('Submitting client data:', JSON.stringify(clientData, null, 2));

  return new Promise((resolve, reject) => {
      this.customerService.createOrUpdateClient(clientData).subscribe({
          next: (response) => {
              console.log('Client data submitted successfully', response);
              if (!this.customerId || this.customerId === '0') {
                  this.customerId = response.toString();
                  // this.updateUrlWithNewId(response.toString());
              }
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
  this.loading = true;
  try {
    const response = await this.submitClientData();
    
    // Only update customerId if we got a new one
    if (!this.customerId && response) {
      this.customerId = response.toString();
    }
    
    // Proceed to next step with current customerId
    this.step++;
    this.activeIndex = this.step - 2;
    this.updateUrl();
  } catch (error) {
    console.error('Error submitting client data:', error);
  } finally {
    this.loading = false;
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

  this.customerService.getCountries().subscribe(countries => {
    this.countries = countries.map(country => ({
      label: country.clientCountryLabel, 
      value: country.clientCountryID      
    }));
  });

  this.customerService.getCountries().subscribe(residenceCountries => {
    this.residenceCountries = residenceCountries.map(country => ({
      label: country.clientCountryLabel, 
      value: country.clientCountryID      
    }));
  });

  this.customerService.getCountries().subscribe(companyCountries => {
    this.companyCountries = companyCountries.map(country => ({
      label: country.clientCountryLabel, 
      value: country.clientCountryID      
    }));
  });

  this.customerService.getResidencyStatuses().subscribe(statuses => {
    this.residencyStatuses = statuses.map(status => ({
      label: status.residencyStatusLabel,
      value: status.residencyStatusID    
    }));
  });

  this.customerService.getIdentities().subscribe(identities => {
    this.identities = identities.map(identity => ({
      label: identity.identityLabel,
      value: identity.identityID    
    }));
  });
  }

  loadClientData() {
    this.customerService.getClientById(this.customerId).subscribe({
      next: (client) => {
        // Set the card selection based on client type
        this.isSelected1 = client.is_individual;
        this.isSelected2 = client.is_organisation;
        
        // Set the items for steps based on client type
        this.items = client.is_individual ? [
          { label: 'Informations générales' },
          { label: 'Informations détaillées' },
          { label: "Zone d'implantation" }
        ] : [
          { label: 'Informations générales' },
          { label: 'Informations détaillées' },
          { label: "Gérant/Manager" }
        ];
  
        // Populate all form fields
        this.populateFormFields(client);
      },
      error: (err) => {
        console.error('Error loading client data', err);
      }
    });
  }

  populateFormFields(client: any) {
    // Basic info
    this.LastName = client.LastName;
    this.FirstName = client.FirstName;
    this.BirthDate = client.BirthDate;
    this.Nationality = client.Nationality;
    this.Email = client.Email;
    this.Address = client.Address;
    this.City = client.City;
    this.MobilePhone = client.MobilePhone;
    this.LandlinePhone = client.LandlinePhone;
    this.WorkPhone = client.WorkPhone;
    this.RequestedAmount = client.RequestedAmount;
    this.OriginDetails = client.OriginDetails;
    
    // For physical person
    if (client.is_individual) {
      this.CIN = client.CIN;
      this.ResidencePermit = client.ResidencePermit;
      this.PassportNumber = client.PassportNumber;
      
      // Set dropdown selections
      this.selectedTitle = this.titles.find(t => t.value === client.ClientTitleID);
      this.selectedRole = this.roles.find(r => r.value === client.RoleID);
      this.selectedMaritalStatus = this.maritalStatuses.find(s => s.value === client.MaritalStatusID);
      this.selectedCountry = this.countries.find(c => c.value === client.CountryID);
      this.selectedResidenceCountry = this.residenceCountries.find(c => c.value === client.ResidenceCountryID);
      this.selectedClientOrigin = this.clientOrigins.find(o => o.value === client.OriginID);
      this.selectedResidencyStatus = this.residencyStatuses.find(s => s.value === client.ResidencyStatusID);
      this.selectedIdentity = this.identities.find(i => i.value === client.IdentityID);
      
      // Set radio button selections
      this.selectedStatut_Occupation = client.IsOwner ? 
        this.statuts_Occupation.find(s => s.key === 'A') : 
        this.statuts_Occupation.find(s => s.key === 'B');
    }
    
    // For legal entity
    if (client.is_organisation) {
      this.CompanyName = client.CompanyName;
      this.CreationDate = client.CreationDate;
      this.RegistrationNumber = client.RegistrationNumber;
      this.CompanyAddress = client.CompanyAddress;
      this.CompanyCity = client.CompanyCity;
      this.SocialCapital = client.SocialCapital;
      
      // Set dropdown selections
      this.selectedLegalForm = this.legalForms.find(f => f.value === client.LegalFormID);
      this.selectedBusinessActivity = this.businessActivities.find(a => a.value === client.BusinessActivityID);
      this.selectedCompanyCountry = this.companyCountries.find(c => c.value === client.CompanyCountryID);
      
      // Load managers if they exist
      if (client.ClientManagers && client.ClientManagers.length > 0) {
        this.managers = client.ClientManagers.map(manager => ({
          ManagerTitleID: this.titles.find(t => t.value === manager.ManagerInformation?.ManagerTitleID),
          ManagerLastName: manager.ManagerInformation?.ManagerLastName,
          ManagerFirstName: manager.ManagerInformation?.ManagerFirstName,
          ManagerBirthDate: manager.ManagerInformation?.ManagerBirthDate,
          ManagerNationality: manager.ManagerInformation?.ManagerNationality,
          Id_Identity: manager.ManagerInformation?.Id_Identity === 1 ? 
            { name: 'CIN', key: 'A' } : 
            manager.ManagerInformation?.Id_Identity === 2 ? 
            { name: 'Carte Séjour', key: 'B' } : 
            { name: 'Passeport', key: 'C' },
          CIN: manager.ManagerInformation?.CIN,
          CarteSejour: manager.ManagerInformation?.CarteSejour,
          Passeport: manager.ManagerInformation?.Passeport,
          Id_ManagerMaritalStatus: this.maritalStatuses.find(s => s.value === manager.ManagerInformation?.Id_ManagerMaritalStatus),
          ManagerCity: manager.ManagerInformation?.ManagerCity,
          ManagerCountryID: this.countries.find(c => c.value === manager.ManagerInformation?.ManagerCountryID),
          ManagerResidenceCountryID: this.residenceCountries.find(c => c.value === manager.ManagerInformation?.ManagerResidenceCountryID),
          ManagerAddress: manager.ManagerInformation?.ManagerAddress
        }));
      }
    }
  }

  onEditClick() {
    // Reset to step 0 and reload the form
    this.step = 0;
    this.activeIndex = 0;
    
    // Reload the client data to ensure we have the latest
    if (this.customerId && this.customerId !== '0') {
      this.loadClientData();
    }
    
    this.updateUrl();
  }
}