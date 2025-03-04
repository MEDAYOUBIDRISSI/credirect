import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

interface Role {
  name: string,
  code: string
}

export class Manager {
  nom: string;
  prenom: string;
  dateNaissance: string;
  civilite: string;
  nationalite: string;
  selectedIdentity: any;
  cin: string;
  carteSejour: string;
  passeport: string;
  situationFamiliale: string;
  ville: string;
  pays: string;
  paysResidence: string;
  adresse: string;
}
@Component({
  selector: 'app-add-customer-file',
  templateUrl: './add-customer-file.component.html',
  styleUrl: './add-customer-file.component.scss'
})
export class AddCustomerFileComponent implements OnInit{
  
managers: Manager[] = [
  {
    nom: '',
    prenom: '',
    dateNaissance: '',
    civilite: '',
    nationalite: '',
    selectedIdentity: null,
    cin: '',
    carteSejour: '',
    passeport: '',
    situationFamiliale: '',
    ville: '',
    pays: '',
    paysResidence: '',
    adresse: ''
  }
];

  items: any[]=[];
  activeIndex= 0;
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

  roles!: Role[];
  selectedRole!: Role;

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

  isNextDisabled(): boolean {
    if((this.step == 0 && !this.isSelected1 && !this.isSelected2) || this.step == 1 && !this.selectedRole){
      return true;
    }else{
      return false;
    }
  }

  selectCard(cardNumber: number) {
    this.isSelected1 = cardNumber === 1;
    this.isSelected2 = cardNumber === 2;
    if (cardNumber === 1) {
      this.items = [
        {
            label: 'Informations générales',
        },
        {
            label: 'Informations détaillées',
        },
        {
            label: "Zone d'implantation",
        },
      ];
    } else if (cardNumber === 2) {
      this.items = [
        {
            label: 'Informations générales',
        },
        {
            label: 'Informations détaillées',
        },
        {
            label: "Gérant/Manager",
        },
      ];
    }
    // this.updateUrl();
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
  this.router.navigate(['/credirect/customer/add/', this.step]);
}

addManager() {
  this.managers.push(new Manager());
}

removeManager(index: number) {
  this.managers.splice(index, 1);
}

    @ViewChild('filter') filter!: ElementRef;

  constructor(private customerService: CustomerService, private productService: ProductService, private router: Router, private route: ActivatedRoute
  ) 
  {
    
  }


  ngOnInit() {

    this.route.params.subscribe((params) => {
      const stepFromUrl = +params['step']; // Convert to number
      if (!isNaN(stepFromUrl) && stepFromUrl >= 0 && stepFromUrl <= 6) {
        this.step = stepFromUrl;
        this.activeIndex = this.step - 2; // Adjust activeIndex for steps 2, 3, 4
      }
    });

    this.situations_familiales = [
      { label: 'Célibataire', value: 'Célibataire' },
      { label: 'Marié(e)', value: 'Marié(e)' },
      { label: 'Veuf(e)', value: 'Veuf(e)' },
      { label: 'Divorcé(e)', value: 'Divorcé(e)' },
    ];

    this.provenances_clients = [
      { label: 'Site Web', value: 'Site Web' },
      { label: 'Compagne Facebook/Instagram', value: 'Compagne Facebook/Instagram' },
      { label: 'Promoteur Immobilier', value: 'Promoteur Immobilier' },
      { label: 'Agence Immobilière', value: 'Agence Immobilière' },
      { label: 'Mandataires', value: 'Mandataires' },
      { label: 'Apporteurs d’Affaire Individuel (AAI)', value: 'Apporteurs d’Affaire Individuel (AAI)' },
      { label: 'Parrainage', value: 'Parrainage' },
    ];

  this.formes_juridiques = [
    { label: 'Société à Responsabilité Limitée', value: 'Société à Responsabilité Limitée' },
    { label: 'Association', value: 'Association' },
    { label: 'Fondation', value: 'Fondation' },
    { label: 'Société en commandite par actions', value: 'Société en commandite par actions' },
    { label: 'Société Civil Immobilière', value: 'Société Civil Immobilière' },
    { label: 'Société en Nom Collectif', value: 'Société en Nom Collectif' },
    { label: 'Société anonyme', value: 'Société anonyme' },
    { label: 'Société en commandite simple', value: 'Société en commandite simple' },
    { label: 'Groupement d’interêt économique', value: 'Groupement d’interêt économique' },
];

this.business_activities = [
  { label: 'Machines', value: 'Machines' },
  { label: 'Distributeurs automatiques', value: 'Distributeurs automatiques' },
  { label: 'Concessions', value: 'Concessions' },
  { label: 'Opérations de vente au détail', value: 'Opérations de vente au détail' },
];

    this.civilites = [
      { label: 'M', value: 'M' },
      { label: 'Mme', value: 'Mme' },
      { label: 'Melle', value: 'Melle' },
    ];

    this.caisses = [
      { label: 'CIMR', value: 'CIMR' },
      { label: 'CMR', value: 'CMR' },
      { label: 'RCAR', value: 'RCAR' },
      { label: 'CNSS', value: 'CNSS' },
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

  this.roles = [
    { name: 'Emprunteur', code: '1' },
    { name: 'Co-emprunteur', code: '2' },
    { name: 'Caution personnelle et solidaire', code: '3' },
    { name: 'Caution hypothécaire', code: '4' },
    { name: 'Propriétaire', code: '5' },
    { name: 'Propriétaire dans l’indivision', code: '6' },
    { name: 'Usufruitier', code: '7' },
    { name: 'Nu-propriétaire', code: '8' },
  ];

  this.selectedIdentity = this.identities[0];
  this.selectedIdentity2 = this.identities2[0];
  this.selectedStatut = this.statuts[0];
  this.selectedStatut_Occupation = this.statuts_Occupation[0];
  // this.step = 6;

  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
    this.step = event + 2;
    this.updateUrl();
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
