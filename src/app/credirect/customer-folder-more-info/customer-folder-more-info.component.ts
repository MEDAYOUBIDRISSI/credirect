import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { Table } from 'primeng/table';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';
@Component({
  selector: 'app-customer-folder-more-info',
  templateUrl: './customer-folder-more-info.component.html',
  styleUrl: './customer-folder-more-info.component.scss'
})
export class CustomerFolderMoreInfoComponent implements OnInit{

  items: any[]=[];
  tierID = null;
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

  user :any;
  pension = []
  infoBank :any = []
  engagement: any = {
    NatureCommitmentID: null,
    AgencyBankID: null,
    OtherAgency: null,
    Maturity: null,
    Outstanding: null,
    RepayableEarly: null
  };
  // form: FormGroup;
  professions = [
    { label: 'Salarié', value: 1 },
    { label: 'Commerçant personne physique', value: 2 },
    { label: 'Profession libérale', value: 3 },
    { label: 'Gérant de société', value: 4 },
    { label: 'Retraité ou pensionnaire', value: 5 },
    { label: 'Rentier', value: 6 },
  ];
  Profession: any = null;
  natureBailOptions = [
    { label: 'Appartement', value: 1 },
    { label: 'Maison', value: 2 },
    { label: 'Magasin', value: 3 },
    { label: 'Plateau', value: 4 },
    { label: 'Lot de terrain', value: 5 },
    { label: 'Dépôt', value: 6 },
    { label: 'Hangard', value: 7 },
    { label: 'Agrément', value: 8 },
  ];

  organismOptions = [
    { label: 'CIMR', value: 1 },
    { label: 'CMR', value: 2 },
    { label: 'RCAR', value: 3 },
    { label: 'CNSS', value: 4 }
  ];
  pensionOptions = [
    { label: 'Retraite', value: 1 },
    { label: 'veuvage', value: 2 },
    { label: 'invalidité ', value: 3 }
  ];

  banks = [
    // { label: 'Banque Populaire', value: 'Banque Populaire' },
    // { label: 'Attijariwafa Bank', value: 'Attijariwafa Bank' },
    // { label: 'BMCE Bank', value: 'BMCE Bank' },
    // { label: 'Société Générale Maroc', value: 'Société Générale Maroc' },
    // { label: 'Crédit du Maroc', value: 'Crédit du Maroc' },
    // { label: 'CIH Bank', value: 'CIH Bank' },
  ];
  accountTypes = [
    { label: 'PRINCIPAL', value: true },
    { label: 'SECONDAIRE', value: false },
  ];
   remboursableTypes = [
    { label: 'Oui', value: true },
    { label: 'Non', value: false },
  ];
  engagementTypes = [
    // { label: 'Crédit immobilier', value: 'Crédit immobilier' },
    // { label: 'Crédit à la consommation', value: 'Crédit à la consommation' },
    // { label: 'Crédit automobile', value: 'Crédit automobile' },
    // { label: 'Crédit hypothécaire', value: 'Crédit hypothécaire' },
    // { label: 'Crédit d’investissement', value: 'Crédit d’investissement' },
    // { label: 'Crédit révolving', value: 'Crédit révolving' },
    // { label: 'Autre crédit', value: 'Autre crédit' },
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
    private CustomerService: CustomerService,
    private route: ActivatedRoute) 
  {
    this.tierID = this.route.snapshot.paramMap.get('client_id')
  }
  onProfessionChange(event) {
    console.log(event.value);
    // this.selectedProfession = this.form.get('profession')?.value;
  }

  ngOnInit() {
    this.getTierByID();
    this.getInfoBank();
    this.selectCard(1);
    this.getAllBanks();
    this.getAllCreditType();
    this.getEngagement()

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

  //   this.customerService.getCustomersLarge().then(customers => {
  //     this.customers1 = customers;
  //     this.loading = false;

  //     // @ts-ignore
  //     this.customers1.forEach(customer => customer.date = new Date(customer.date));
  // });

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

  getTierByID(){
    let body = {
      tierID: this.tierID
    }
    this.CustomerService.getTierByID(body).then((res: any) => {
      if (res.status_code === 200) {
        this.user = this.fixPascalCaseKeys(res?.data[0]);
        this.Profession = res?.data[0]?.profession;
        const pensionsRaw = res?.data[0]?.pensions || [];
      this.pension = pensionsRaw.map((p: any) => this.fixPensionKeys(p));
      }
    })
  }

  saveTierInfoProf(){
     // Inject the list of pensions into the user object
      this.user.Pension = this.pension;
    let body = {
      tierID: this.tierID,
      Profession: this.Profession,
      user: this.user
    }
    this.CustomerService.saveTierInfoProf(body).then((res: any) => {
      if (res.status_code === 200) {
        
      }
    })
  }

  fixPascalCaseKeys(data: any): any {
  return {
    ...data,
    Date_debut_exercice: data?.date_debut_exercice ? new Date(data?.date_debut_exercice) : null,
    Date_Embauche: data?.date_Embauche ? new Date(data?.date_Embauche) : null,
    Date_Creation_RC: data?.date_Creation_RC ? new Date(data?.date_Creation_RC) : null,
    Date_Creation_Company: data?.date_Creation_Company ? new Date(data?.date_Creation_Company) : null,
    
    Capital_Social: data?.capital_Social,
    ResultatYearN: data?.resultatYearN,
    ChiffreAffaireYearN: data?.chiffreAffaireYearN,
    ResultatYearN_1: data?.resultatYearN_1,
    ChiffreAffaireYearN_1: data?.chiffreAffaireYearN_1,
    PartsParticipationSociete: data?.partsParticipationSociete,
    Nature_activity: data?.nature_activity,
    IfOrTp: data?.ifOrTp,
    Adress_activity: data?.adress_activity,
    Honoraires: data?.honoraires,
    Fonction: data?.fonction,
    Employeur: data?.employeur,
    Salaire: data?.salaire,
    NRC: data?.nrc,
    Revenu: data?.revenu,
    Denomination: data?.denomination,
    ActivityCompany: data?.activityCompany,
    Nature_Bail: data?.nature_Bail,
    Rent: data?.rent
  };
  
}
fixPensionKeys(data: any): any {
  return {
    id: data?.id,
    NaturePension: data?.naturePension,
    OrganismePension: data?.organismePension,
    TypePension: data?.typePension,
    Montant: data?.montant
  };
}

  // Ajouter un Pension
  addPension(): void {
    this.pension.push({
      id: null,
      NaturePension: '',
      OrganismePension: 1,
      TypePension: 1,
      Montant: 0
    });
  }

  // Supprimer un Pension
  removePension(index: number): void {
    this.pension.splice(index, 1);
  }

  getAllBanks(){
    let body = {
    }
    this.CustomerService.getAllBanks(body).then((res: any) => {
      if (res.status_code === 200) {
        this.banks = res?.data;
      }
    })
  }

  // Ajouter un InfoBank
  addInfoBank(): void {
    this.infoBank.push({
      id: null,
      AgencyBankID: null,
      Balance: 0,
      CumulativeCreditMovement: 0,
      IsPrincipal: true
    });
  }

  // Supprimer un InfoBank
  removeInfoBank(index: number): void {
    this.infoBank.splice(index, 1);
  }

  getInfoBank(){
    let body = {
      tierID: this.tierID
    }
        console.log("body", body);
    this.CustomerService.getInfoBank(body).then((res: any) => {
            console.log("res", res);
      if (res.status_code === 200) {
        this.infoBank = res?.data?.map((item: any) => this.fixInfoBankKeys(item)) || [];
      }
    })
  }

  saveInfoBank(){
    let body = {
      tierID: this.tierID,
      infoBank: this.infoBank
    }
    this.CustomerService.saveInfoBank(body).then((res: any) => {     
      if (res.status_code === 200) {
        
      }
    })
  }
  fixInfoBankKeys(data: any): any {
    return {
      InfoBankID: data?.infoBankID,
      AgencyBankID: data?.agencyBankID,
      AgencyName: data?.agencyName,
      ClientID: data?.clientID,
      Balance: data?.balance,
      CumulativeCreditMovement: data?.cumulativeCreditMovement,
      IsPrincipal: data?.isPrincipal
    };
  }
  getAllCreditType(){
    let body = {
    }
    this.CustomerService.getAllCreditType(body).then((res: any) => {
      if (res.status_code === 200) {
        this.engagementTypes = res.data;
      }
    })
  }

  getEngagement(){
    let body = {
      tierID: this.tierID
    }
    this.CustomerService.getEngagement(body).then((res: any) => {
      console.log("res", res);
      if (res.status_code === 200) {
        // this.engagement = res?.data[0];
        this.engagement = this.fixEngagementKeys(res?.data?.[0]) || {
        NatureCommitmentID: null,
        AgencyBankID: null,
        OtherAgency: null,
        Maturity: null,
        Outstanding: null,
        RepayableEarly: null
        };
        
      }
    })
  }

  saveEngagement(){
    let body = {
      tierID: this.tierID,
      engagement: this.engagement
    }
    this.CustomerService.saveEngagement(body).then((res: any) => {
      if (res.status_code === 200) {
        
      }
    })
  }

  fixEngagementKeys(data: any): any {
    return {
      BankCommitmentChargeID: data?.bankCommitmentChargeID,
      NatureCommitmentID: data?.natureCommitmentID,
      AgencyBankID: data?.agencyBankID,
      OtherAgency: data?.otherAgency,
      ClientID: data?.clientID,
      Maturity: data?.maturity,
      Outstanding: data?.outstanding,
      RepayableEarly: data?.repayableEarly
    };
  }

  onDone() {
    window.history.back();
  }
 
}
