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
  displayDeleteConfirmation: boolean = false;
  deleteLoading: boolean = false;

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
  identities: any[] = [];

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
  identityTypes: { [key: string]: number } = {};

  clientData: any = {};
  editRoles: any = false;

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
    this.customerId = this.route.snapshot.paramMap.get('customerId') || null;
  }

  ngOnInit() {

    this.loadLookups();
    this.setupRouteListener();
    this.checkRole_Step(this.customerId);

    this.route.params.subscribe((params) => {
      const step = +params['step'] || 0;
      this.step = step;
      this.activeIndex = Math.max(0, step - 2); // Initialize correctly
      console.log(`Init - Step: ${this.step}, ActiveIndex: ${this.activeIndex} - ${this.isSelected1}`);
      
      if (params['customerId']) {
        this.customerId = params['customerId'];
        this.loadClientData();
      }
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

  isPreviousDisabled(): boolean {
    return this.editRoles && this.step == 2;
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

  checkRole_Step(customerID: any){
    if(customerID == 0){
      this.editRoles = false;
    }else{
      this.editRoles = true;
    }  
  }

  goToPreviousStep() {
    if (this.step > 0) {
      this.step--;
      this.activeIndex = this.step - 2;
      this.updateUrl();
    }
  }

  goToList() {
    const urlParts = ['/credirect/customer'];
    this.router.navigate(urlParts).then(() => {
      this.cdr.detectChanges();
    });
  }

  goToFolders() {
    const urlPart = ['/credirect/customer/folder/add'];
    this.router.navigate(urlPart).then(() => {
      this.cdr.detectChanges();
    });
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
      ManagerLastName: null,           
      ManagerFirstName: null,          
      ManagerBirthDate: null,         
      ManagerNationality: null,       
      Id_Identity: null,             
      CIN: null,                       
      CarteSejour: null,               
      Passeport: null,                
      Id_ManagerMaritalStatus: null, 
      ManagerCity: null,               
      ManagerCountryID: null,        
      ManagerResidenceCountryID: null, 
      ManagerAddress: null 
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
  // Filter out empty managers (adjust based on required fields)
  const nonEmptyManagers = this.managers.filter(manager => 
    manager.ManagerLastName?.trim() || 
    manager.ManagerFirstName?.trim()
  );

  // // Format managers correctly for the API
  // const formattedManagers = nonEmptyManagers.map(manager => {
  //   // Determine identity type
  //   let identityType = null;
  //   if (manager.Id_Identity) {
  //     identityType = manager.Id_Identity.key === 'A' ? 1 : 
  //                  manager.Id_Identity.key === 'B' ? 2 : 
  //                  manager.Id_Identity.key === 'C' ? 3 : null;
  //   }

  //   return {
  //     ManagerID: manager?.ManagerID || 0, // Required for updates
  //     ManagerInformation: {
  //       ManagerTitleID: manager?.ManagerTitleID?.value || null,
  //       LastName: manager.ManagerLastName, 
  //       FirstName: manager.ManagerFirstName,
  //       ManagerBirthDate: manager?.ManagerBirthDate,
  //       ManagerNationality: manager?.ManagerNationality,
  //       Id_Identity: identityType,
  //       CIN: manager?.CIN,
  //       CarteSejour: manager?.CarteSejour,
  //       Passeport: manager?.Passeport,
  //       ManagerAddress: manager?.ManagerAddress,
  //       ManagerCity: manager?.ManagerCity,
  //       ManagerCountryID: manager?.ManagerCountryID?.value || null,
  //       ManagerResidenceCountryID: manager?.ManagerResidenceCountryID?.value || null,
  //       Id_ManagerMaritalStatus: manager?.MaritalStatusID?.value || null,
  //     }
  //   };
  // });

  const formattedManagers = this.managers.map(manager => ({
    ManagerID: manager.ManagerID || 0,
    ManagerInformation: {
      ManagerTitleID: manager.ManagerTitleID?.value || null,
      LastName: manager.ManagerLastName,
      FirstName: manager.ManagerFirstName,
      BirthDate: manager.ManagerBirthDate ? new Date(manager.ManagerBirthDate).toISOString() : null,
      Nationality: manager.ManagerNationality,
      IdentityID: manager.Id_Identity?.key === 'A' ? 1 : 
                manager.Id_Identity?.key === 'B' ? 2 : 
                manager.Id_Identity?.key === 'C' ? 3 : null,
      CIN: manager.CIN || null,
      CarteSejour: manager.CarteSejour || null,
      Passeport: manager.Passeport || null,
      Address: manager.ManagerAddress || null,  
      City: manager.ManagerCity || null,       
      CountryID: manager.ManagerCountryID?.value || null,
      ResidenceCountryID: manager.ManagerResidenceCountryID?.value || null,
      MaritalStatusID: manager.Id_ManagerMaritalStatus?.value || null
    }
  }));

  const clientData = {
    ClientID: this.customerId && this.customerId !== "0" ? +this.customerId : undefined,
    is_individual: this.isSelected1,
    is_organisation: this.isSelected2,
    RoleID: this.selectedRole?.value || null,
    roleID: this.selectedRole?.value || null,
    LastName: this.LastName,
    FirstName: this.FirstName,
    BirthDate: this.BirthDate,
    ClientTitleID: this.selectedTitle?.value || null,
    Nationality: this.Nationality,
    Email: this.Email,
    IdentityID: this.selectedIdentity?.value || null,
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
    ResidencyStatusID: this.selectedResidencyStatus?.value || null,
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
    LegalFormID: this.selectedLegalForm?.value || null,
    ClientManagers: this.isSelected2 && nonEmptyManagers.length > 0 ? formattedManagers : []   
  };

  console.log('Client Data:', clientData); // Debug log

  return new Promise((resolve, reject) => {
    this.customerService.createOrUpdateClient(clientData).subscribe({
      next: (response) => {
        console.log('Client data submitted successfully', response);
        if (!this.customerId || this.customerId === '0') {
          this.customerId = response.toString();
        }
        resolve(response);
      },
      error: (err) => {
        console.error('Error submitting client data:', err);
        reject(err);
      },
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

async simple_onNextClick() {
    
    // Proceed to next step with current customerId 
    this.RoleID = this.selectedRole?.value || null;
    this.step++;
    this.activeIndex = this.step - 2;
    this.updateUrl();

}

async loadLookups() {
  await this.customerService.getClientRoles().toPromise().then(roles => {
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
    
    // Initialize identityTypes dynamically
    identities.forEach(identity => {
      if (identity.identityLabel.toLowerCase().includes('cin')) {
        this.identityTypes['CIN'] = identity.identityID;
      } else if (identity.identityLabel.toLowerCase().includes('séjour') || 
                 identity.identityLabel.toLowerCase().includes('sejour')) {
        this.identityTypes['CARTE_SEJOUR'] = identity.identityID;
      } else if (identity.identityLabel.toLowerCase().includes('passeport')) {
        this.identityTypes['PASSPORT'] = identity.identityID;
      }
    });
  });
  }

  async loadClientData() {
    if (!this.customerId || this.customerId === '0') {
      console.error('Invalid customerId:', this.customerId);
      return;
    }
    this.loading = true;
    try {
      const response: any = await this.customerService.getClientById(this.customerId!).toPromise();
      
      console.log('API Response:', response); // Debug log
      
      if (!response?.data) {
        console.error('No client data received');
        this.loading = false;
        return;
      }
  
      const client = response.data;

      if (client.is_individual !== null || client.is_organisation !== null) {
        // Use explicit flags if provided
        this.isSelected1 = client.is_individual === true;
        this.isSelected2 = client.is_organisation === true;
      } else {
        // Fallback: Determine type based on other fields
        this.isSelected1 = !!client.LastName && !client.CompanyName;
        this.isSelected2 = !!client.CompanyName;

      }
      
      if (!this.isSelected1 && !this.isSelected2) {
        console.warn('No type could be determined - defaulting to Individual');
        this.isSelected1 = true;
      }
      
      // IMPORTANT: Set the items array based on client type
      this.items = this.isSelected1 ? [
        { label: 'Informations générales' },
        { label: 'Informations détaillées' },
        { label: "Zone d'implantation" }
      ] : [
        { label: 'Informations générales' },
        { label: 'Informations détaillées' },
        { label: "Gérant/Manager" }
      ];
  
      // Populate form fields
      this.populateFormFields(client);
      
      // Force UI update
      this.cdr.detectChanges();
      
    } catch (error) {
      console.error('Error loading client:', error);
      this.loading = false;
    }
  }

  populateFormFields(client: any) {
        // Basic info
    this.LastName = client.lastName;  
    this.FirstName = client.firstName;  
    this.BirthDate =  this.formatDateForInput(client.birthDate);
    this.Nationality = client.nationality;  
    this.Email = client.email;  
    this.Address = client.address;  
    this.City = client.city;  
    this.MobilePhone = client.mobilePhone;  
    this.LandlinePhone = client.landlinePhone;  
    this.WorkPhone = client.workPhone;  
    this.RequestedAmount = client.requestedAmount; 
    this.OriginDetails = client.originDetails; 

    // For physical person
    if (client.is_individual) {
      this.CIN = client.cin;  
      this.ResidencePermit = client.residencePermit;  
      this.PassportNumber = client.passportNumber;  
      
      // Set dropdown selections
      this.selectedTitle = this.titles.find(t => t.value === client.clientTitleID);  
      this.selectedRole = this.roles.find(r => r.value === (client.RoleID || client.roleID));
      this.selectedMaritalStatus = this.maritalStatuses.find(s => s.value === client.maritalStatusID);  
      this.selectedCountry = this.countries.find(c => c.value === client.countryID);  
      this.selectedResidenceCountry = this.residenceCountries.find(c => c.value === client.residenceCountryID);  
      this.selectedClientOrigin = this.clientOrigins.find(o => o.value === client.originID);  
      this.selectedResidencyStatus = this.residencyStatuses.find(s => s.value === client.residencyStatusID);
      if (client.IdentityID) {
        this.selectedIdentity = this.identities.find(i => i.value === client.identityID);
        this.cdr.detectChanges();
      } 
      
      // Set radio button selections
      this.IsOwner = client.isOwner;  
      this.IsTenant = client.isTenant;
    }

    // For legal entity
    if (client.is_organisation) {
      this.CompanyName = client.companyName;  
      this.CreationDate = client.creationDate ? this.formatDateForInput(client.creationDate) : null;
      this.RegistrationNumber = client.registrationNumber;  
      this.CompanyAddress = client.companyAddress;  
      this.CompanyCity = client.companyCity;  
      this.SocialCapital = client.socialCapital;  
      
      // Set dropdown selections
      this.selectedLegalForm = this.legalForms.find(f => f.value === client.legalFormID);  
      this.selectedBusinessActivity = this.businessActivities.find(a => a.value === client.businessActivityID);  
      this.selectedCompanyCountry = this.companyCountries.find(c => c.value === client.companyCountryID);  
      
      // Load managers if they exist
      if (client.managers && client.managers.length > 0) {  
        this.managers = client.managers.map(manager => ({
          ManagerTitleID: this.titles.find(t => t.value === manager.managerTitleID),  
          ManagerLastName: manager.lastName,  
          ManagerFirstName: manager.firstName,  
          ManagerBirthDate: this.formatDateForInput(manager.birthDate), 
          ManagerNationality: manager.nationality,  
          Id_Identity: manager.identityType === 1 ?  
            { name: 'CIN', key: 'A' } : 
            manager.identityType === 2 ? 
            { name: 'Carte Séjour', key: 'B' } : 
            { name: 'Passeport', key: 'C' },
          CIN: manager.cin,  
          CarteSejour: manager.carteSejour,  
          Passeport: manager.passeport,  
          Id_ManagerMaritalStatus: this.maritalStatuses.find(s => s.value === manager.maritalStatusID),  
          ManagerCity: manager.city,  
          ManagerCountryID: this.countries.find(c => c.value === manager.countryID),  
          ManagerResidenceCountryID: this.residenceCountries.find(c => c.value === manager.residenceCountryID),  
          ManagerAddress: manager.address  
        }));
      }
    }}

    private formatDateForInput(isoDate: string): string {
      return isoDate?.split('T')[0];
    }

  onEditClick() {
    this.step = 0;
    this.activeIndex = 0;
    
    // Reload the client data to ensure we have the latest
    if (this.customerId && this.customerId !== '0') {
      this.loadClientData().then(() => {
        // After loading data, move to step 1 (role selection)
        this.step = 1;
        this.activeIndex = 0;
        this.updateUrl();
      });
    } else {
      this.updateUrl();
    }
  }

  onEditClick_Update() {
    this.router.navigate(['/redirect']).then(() => {
      this.router.navigate(['/credirect/customer/add', 2, this.customerId]).then(() => {
        window.location.reload(); // Full page refresh
      });
    });
  }


  private setupRouteListener(): void {
    this.route.params.subscribe((params) => {
      const stepFromUrl = +params['step']; // Gets 2 from /add/2/2
      const customerIdFromUrl = params['customerId']; // Gets 2 from /add/2/2
  
      // Update step and activeIndex together
      if (!isNaN(stepFromUrl)) {
        this.step = stepFromUrl;
        this.activeIndex = Math.max(0, this.step - 2); // Now step 2 → index 0
        console.log(`Route changed - Step: ${this.step}, ActiveIndex: ${this.activeIndex}`);
      }
  
      if (customerIdFromUrl !== this.customerId) {
        this.customerId = customerIdFromUrl;
        if (this.customerId && this.customerId !== '0') {
          this.loadClientData();
        }
      }
    });
  }

  resetForm() {
    this.isSelected1 = false;
    this.isSelected2 = false;
    this.items = [];
    this.activeIndex = 0;
    // Reset all form fields...
  }

  onDeleteClick() {
    if (!this.customerId) return;
  
    this.loading = true;
    
    this.customerService.deleteClient(+this.customerId).subscribe({
      next: () => {
        // Show success message
        console.log('Client deleted successfully');
        
        // Navigate back to the client list or another appropriate page
        this.router.navigate(['/credirect/customer']);
      },
      error: (err) => {
        console.error('Error deleting client', err);
        this.loading = false;
        // Show error message to user
      }
    });
  }

  showDeleteConfirmation() {
    this.displayDeleteConfirmation = true;
  }
  
  hideDeleteConfirmation() {
    this.displayDeleteConfirmation = false;
  }
  
  confirmDelete() {
    if (!this.customerId || this.customerId === '0') return;
  
    this.deleteLoading = true;
    
    this.customerService.deleteClient(+this.customerId).subscribe({
      next: () => {
        this.deleteLoading = false;
        this.displayDeleteConfirmation = false;

        console.log('Client deleted successfully');
        
        this.router.navigate(['/credirect/customer']);
      },
      error: (err) => {
        this.deleteLoading = false;
        console.error('Error deleting client', err);
        alert('Une erreur est survenue lors de la suppression du client.');
      }
    });
  }

  determineSelectedIdentity() {
    if (this.CIN && this.CIN.trim() !== '') {
      this.selectedIdentity = this.identities.find(i => i.value === this.identityTypes['CIN']);
    } else if (this.ResidencePermit && this.ResidencePermit.trim() !== '') {
      this.selectedIdentity = this.identities.find(i => i.value === this.identityTypes['CARTE_SEJOUR']);
    } else if (this.PassportNumber && this.PassportNumber.trim() !== '') {
      this.selectedIdentity = this.identities.find(i => i.value === this.identityTypes['PASSPORT']);
    } else {
      this.selectedIdentity = null; // No default selection
    }
  }
}