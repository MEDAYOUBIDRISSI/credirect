import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Table } from 'primeng/table';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-customer-folder-more-info',
  templateUrl: './customer-folder-more-info.component.html',
  styleUrl: './customer-folder-more-info.component.scss'
})
export class CustomerFolderMoreInfoComponent implements OnInit{

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
  expandedRows: any = {};
  isExpanded: boolean = false;
  idFrozen: boolean = false;
  loading: boolean = true;

  isSelected1 = false;
  isSelected2 = false;
  step = 1;

  roles!: any[];
  selectedRole!: any;

  selectedIdentity: any = null;
  selectedIdentity2: any = null;
  rem1: any = true;
  rem2: any = false;
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

  user = {
    civilite: 'Monsieur',
    nomPrenom: 'El Amrani Ahmed',
    dateNaissance: '10/12/1990',
    nationalite: 'Marocaine',
    identite: 'CIN',
    adresse: '45 Rue Mohammed V',
    ville: 'Casablanca',
    pays: 'Maroc',
    paysResidence: 'Maroc',
    situationFamiliale: 'Marié',
    telephoneMobile: '06 12 34 56 78',
    telephoneFixe: '05 22 33 44 55',
    telephoneProfessionnel: '05 22 99 88 77',
    email: 'ahmed.elamrani@example.com',
    statut: 'Résident',
    statutOccupation: 'Locataire',
    provenanceClient: 'Agence immobilière',
    origin: 'Agence XYZ - Casablanca',
    montantSollicite: '500,000 MAD'
  };

  // form: FormGroup;
  professions = [
    { label: 'Salarié', value: 'Salarié' },
    { label: 'Commerçant personne physique', value: 'Commerçant' },
    { label: 'Profession libérale', value: 'ProfessionLibérale' },
    { label: 'Gérant de société', value: 'GérantSociété' },
    { label: 'Retraité ou pensionnaire', value: 'Retraité' },
    { label: 'Rentier', value: 'Rentier' },
  ];
  selectedProfession: string = '';
  banks = [
    { label: 'Banque Populaire', value: 'Banque Populaire' },
    { label: 'Attijariwafa Bank', value: 'Attijariwafa Bank' },
    { label: 'BMCE Bank', value: 'BMCE Bank' },
    { label: 'Société Générale Maroc', value: 'Société Générale Maroc' },
    { label: 'Crédit du Maroc', value: 'Crédit du Maroc' },
    { label: 'CIH Bank', value: 'CIH Bank' },
  ];
  accountTypes = [
    { label: 'PRINCIPAL', value: 'PRINCIPAL' },
    { label: 'SECONDAIRE', value: 'SECONDAIRE' },
  ];
  engagementTypes = [
    { label: 'Crédit immobilier', value: 'Crédit immobilier' },
    { label: 'Crédit à la consommation', value: 'Crédit à la consommation' },
    { label: 'Crédit automobile', value: 'Crédit automobile' },
    { label: 'Crédit hypothécaire', value: 'Crédit hypothécaire' },
    { label: 'Crédit d’investissement', value: 'Crédit d’investissement' },
    { label: 'Crédit révolving', value: 'Crédit révolving' },
    { label: 'Autre crédit', value: 'Autre crédit' },
  ];

  isNextDisabled(): boolean {
    if((this.step == 0 && !this.isSelected1 && !this.isSelected2) || this.step == 1 && !this.selectedRole){
      return true;
    }else{
      return false;
    }
  }

  selectCard(cardNumber: number) {
    if (cardNumber === 1) {
      this.isSelected1 = true;
      this.isSelected2 = false;
      this.items = [
        {
            label: 'Information personnelle',
        },
        {
            label: 'Informations professionnelles',
        },
        {
            label: "Données bancaires",
        },
        {
            label: "Engagements bancaires et charges",
        },
      ];
    } else if (cardNumber === 2) {
      this.isSelected2 = true;
      this.isSelected1 = false;
      this.items = [
        {
            label: 'Information personnelle',
        },
        {
            label: 'Informations détaillées',
        },
        {
            label: "Gérant/Manager",
        },
      ];
    }
  }

  goToPreviousStep() {
    if (this.step > 0) {
        this.step--;
        this.activeIndex --;
        // this.activeIndex = this.step - 2;
    }
}

goToNextStep() {
    if (this.step < 5) {
        this.step++;
        this.activeIndex ++;
        // this.activeIndex = this.step - 2;
    }
}
    @ViewChild('filter') filter!: ElementRef;

  constructor(
    private customerService: CustomerService, 
    private productService: ProductService,
    private fb: FormBuilder) 
  {
    // this.form = this.fb.group({
    //   profession: ['', Validators.required],
    //   // Salarié
    //   fonction: [''],
    //   employeur: [''],
    //   dateEmbauche: [''],
    //   salaire: [''],
    //   // Commerçant
    //   rcNumber: [''],
    //   creationDate: [''],
    //   natureActivite: [''],
    //   adresseActivite: [''],
    //   revenu: [''],
    //   // Profession Libérale
    //   natureActiviteLib: [''],
    //   dateDebutExercice: [''],
    //   ifNumber: [''],
    //   adresseActiviteLib: [''],
    //   honoraires: [''],
    //   // Gérant de Société
    //   denomination: [''],
    //   rcNumberGerant: [''],
    //   creationDateGerant: [''],
    //   capitalSocial: [''],
    //   activiteEntreprise: [''],
    //   adresseActiviteGerant: [''],
    //   resultatAnneeN: [''],
    //   chiffreAffaireAnneeN: [''],
    //   resultatAnneeN1: [''],
    //   chiffreAffaireAnneeN1: [''],
    //   partsParticipation: [''],
    //   revenuGerant: [''],
    //   // Retraité ou Pensionnaire
    //   pensionType: [''],
    //   organismePension: [''],
    //   typePension: [''],
    //   montantPension: [''],
    //   // Rentier
    //   natureBail: [''],
    //   typeBien: [''],
    //   agrement: [''],
    //   rente: [''],
    // });
  }
  onProfessionChange(event) {
    console.log(event.value);
    // this.selectedProfession = this.form.get('profession')?.value;
  }

  ngOnInit() {

    this.selectCard(1)
    this.situations_familiales = [
      { label: 'Célibataire', value: 1 },
      { label: 'Marié(e)', value: 2 },
      { label: 'Veuf(e)', value: 3 },
      { label: 'Divorcé(e)', value: 4 },
    ];

    this.provenances_clients = [
      { label: 'Site Web', value: 1 },
      { label: 'Compagne Facebook/Instagram', value: 2 },
      { label: 'Promoteur Immobilier', value: 3 },
      { label: 'Agence Immobilière', value: 4 },
      { label: 'Mandataires', value: 5 },
      { label: 'Apporteurs d’Affaire Individuel (AAI)', value: 6 },
      { label: 'Parrainage', value: 7 },
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

  this.roles = [
    { name: 'Emprunteur ', code: '1' },
    { name: 'Co-emprunteur ', code: '2' },
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

  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
    if (event === 0) {
      this.step = 2;
    } else if (event === 1) {
        this.step = 3; 
    } else if (event === 2) {
        this.step = 4;
    }
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
