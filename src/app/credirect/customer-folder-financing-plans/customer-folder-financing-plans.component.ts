import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer-folder-financing-plans',
  templateUrl: './customer-folder-financing-plans.component.html',
  styleUrl: './customer-folder-financing-plans.component.scss'
})
export class CustomerFolderFinancingPlansComponent  implements OnInit{

   // Étapes du processus
   steps = [
    { label: 'Projet' },
    { label: 'Caractéristiques du Crédit' },
    { label: 'Garantie' },
    { label: 'Commentaire' },
    { label: 'Banque et dépôt' },
  ];

  // Index de l'étape active
  activeIndex = 0;

  // Données du plan de financement
  planFinancement = {
    objetCredit: 1,
    descriptionProjet: '',
    commentCredit: '',
    biens: [] as any[], // Liste des biens associés
    montantCredit: null,
    dureeCredit: null,
    tauxCredit: null,
    garanties: [],
    commentaires: '',
    frequenceRemboursement: null,
    dureeFranchise: null,
    derogationSouhaitee: false,
    assurance: null,
    tauxAssurance: null,
    revenus: null,
    chargesEnCours: null,
    prixVente: null,
    honorairesFactures: null
  };

  // Options pour l'objet du crédit
  objetCreditOptions = [];

  // Options pour la nature du bien
  natureBienOptions = [];

  // Options pour l'affectation du bien
  affectationBienOptions = [];

  // Options pour l'usage du bien
  usageBienOptions = [];

  // Options pour l'état du bien
  etatBienOptions = [];

  // Options pour les garanties
  garantiesOptions = [
    { label: 'Hypothèque en 1er rang', value: 'Hypothèque', selected: false },
    { label: 'Caution personnelle', value: 'Caution', selected: false },
    { label: 'Assurance décès-invalidité', value: 'Assurance', selected: false },
  ];

  canauxVentesList: any[] = [
    { id: 1, name: 'Hypothèque en 1er rang au profit de la banque sur le TF ' },
    { id: 2, name: 'Caution hypothécaire de …… au profit de la banque ' },
    { id: 3, name: 'Domiciliation irrévocable de salaire ' },
    { id: 4, name: 'Engagement de domiciliation des revenus ' },
    { id: 5, name: 'Engagement de domiciliation des transferts ' },
    { id: 6, name: 'Souscription d’une assurance décès invalidité avec une délégation au profit de la banque' },
    { id: 7, name: 'Caution personnelle et solidaire de …..' },
    { id: 8, name: 'RAT crédit de …' }
  ]
  canauxVentesListAfterCheck:any[]=[]
  canauxVentes: any[] = [
    // { id: 1, name: 'Hypothèque en 1er rang au profit de la banque sur le TF ' },
    // { id: 2, name: 'Caution hypothécaire de …… au profit de la banque ' },
  ]

  ckeConfig: any = {
    allowedContent: 'iframe[*]{*}(*);video[*]{*}(*);source[*]{*}(*);',
    forcePasteAsPlainText: true,
    enterMode: 2,
    editable: true,
    sanitize: false,
    extraPlugins: 'media,base64image,image2',
    height: 300,
    maxHeight: 500,
    image2_alignClasses: ['image-align-left', 'image-align-center', 'image-align-right'],
    image2_captionedClass: 'image-captioned',
    toolbar: [
      ['Bold', 'Italic', 'Underline', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink'],
      ['MediaEmbed', 'Image', 'Table', '-', 'Undo', 'Redo', 'insertVideo'],
    ],
    filebrowserBrowseUrl: '/your-file-browser-url/',
    filebrowserUploadUrl: '/your-upload-url/',
    mediaEmbed: {
      previewsInData: true,
      providers: [
        {
          name: 'youtube',
          url: /^https:\/\/www\.youtube\.com\/watch\?v=.+/,
          html: match => {
            const videoId = match[0].split('v=')[1];
            return `
              <iframe 
                width="100%" 
                height="400" 
                src="https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1" 
                frameborder="0" 
                controls
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen controls>
              </iframe>`;
          }
        }
      ]
    },
  };

  facturation = {
    honorairesFactures: null, // Honoraires facturés
    depots: [] as any[], // Liste des dépôts
  };

  // Liste des banques
  banks = [];

  dossierID:any=null

  constructor(private CustomerService: CustomerService, private route: ActivatedRoute) 
  {
      this.dossierID = this.route.snapshot.paramMap.get('dossier_id')
  }

  ngOnInit(): void {
    this.checkCanaux()
    this.getAllObjectCredit()
    this.getAllNatureProperty()
    this.getAllAssignmentProperty() 
    this.getAllUseProperty()
    this.getAlConditionProperty()
    this.getPlanFinancement();
    this.getGarantie();
    this.getAllBanks();
    this.getDepot();
  }

  // Ajouter un bien
  addBien(): void {
    this.planFinancement.biens.push({
      nature: '',
      affectation: '',
      usage: '',
      etat: '',
      adresse: '',
      superficie: null,
      titreFoncier: '',
      prixVente: null,
      valeurReelle: null,
      montantTravaux: null,
    });
  }

  // Supprimer un bien
  removeBien(index: number): void {
    this.planFinancement.biens.splice(index, 1);
  }

  // Passer à l'étape suivante
  nextStep(): void {
    if (this.activeIndex < this.steps.length - 1) {
      this.activeIndex++;
    }
  }

  // Revenir à l'étape précédente
  previousStep(): void {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  // Gérer le changement d'étape
  onStepChange(index: number): void {
    this.activeIndex = index;
  }

  // Soumettre le formulaire
  submitPlanFinancement(): void {
    console.log('Plan de financement soumis :', this.planFinancement);
    // Ajoutez ici la logique pour soumettre les données
  }

  //////////////////
  AddCanauxVentes(name){
    this.canauxVentes.push({id:null, name:name})
    this.checkCanaux();
  }

  AddEmptyCanauxVentes(){
    this.canauxVentes.push({id:null, name:null})
  }

  deleteCanaux(idX:any){
    this.canauxVentes?.splice(idX, 1);
    this.checkCanaux();
  }

  checkCanaux(){
    this.canauxVentesListAfterCheck = this.canauxVentesList.filter(objB =>
      !this.canauxVentes.some(objA => objA.name === objB.name)
    );
  }

  ///////////////////////////::Calcul

  mensualiteTTC: number = 0;
  tauxEndettementGlobal: number = 0;
  quotiteFinancement: number = 0;

  frequenceOptions = [
  { label: 'Mensuelle', value: 1 },
  { label: 'Trimestrielle', value: 2 },
  { label: 'Semestrielle', value: 3 },
  { label: 'Annuelle', value: 4 }
];

assuranceOptions = [
  { label: 'Mensuelle', value: 1 },
  { label: 'Prime Unique', value: 2 }
];

  calculateMensualiteTTC() {
    let { montantCredit, dureeCredit, tauxCredit, tauxAssurance, assurance } = this.planFinancement;

    if (!montantCredit || !dureeCredit || !tauxCredit) return;

    let tauxMensuel = tauxCredit / 100 / 12;
    
    if (assurance === 'mensuelle' && tauxAssurance) {
      tauxMensuel += tauxAssurance / 100 / 12;
    }

    this.mensualiteTTC =
      (montantCredit * tauxMensuel) /
      (1 - Math.pow(1 + tauxMensuel, -dureeCredit));

    this.calculateTauxEndettementGlobal();
    this.calculateQuotiteFinancement();
  }

  calculateTauxEndettementGlobal() {
    let { revenus, chargesEnCours } = this.planFinancement;
    if (!revenus || revenus === 0) return;

    this.tauxEndettementGlobal = ((this.mensualiteTTC + (chargesEnCours || 0)) / revenus) * 100;
  }

  calculateQuotiteFinancement() {
    let { montantCredit, prixVente } = this.planFinancement;
    if (!montantCredit || !prixVente) return;

    this.quotiteFinancement = (montantCredit / prixVente) * 100;
  }

  addDepot(): void {
    this.depots.push({
      banque: null,
      interlocuteur: '',
      agence: '',
      dateEnvoi: null,
    });
  }

  // Supprimer un dépôt
  removeDepot(index: number): void {
    this.depots.splice(index, 1);
  }

  getAllObjectCredit(){
    let body = {
    }
    this.CustomerService.getAllObjectCredit(body).then((res: any) => {
      if (res.status_code === 200) {
        this.objetCreditOptions = res?.data;
      }
    })
  }

  getAllNatureProperty(){
    let body = {
    }
    this.CustomerService.getAllNatureProperty(body).then((res: any) => {
      if (res.status_code === 200) {
        this.natureBienOptions = res?.data;
      }
    })
  }

  getAllAssignmentProperty(){
    let body = {
    }
    this.CustomerService.getAllAssignmentProperty(body).then((res: any) => {
      if (res.status_code === 200) {
        this.affectationBienOptions = res?.data;
      }
    })
  }

  getAllUseProperty(){
    let body = {
    }
    this.CustomerService.getAllUseProperty(body).then((res: any) => {
      if (res.status_code === 200) {
        this.usageBienOptions = res?.data;
      }
    })
  }

  getAlConditionProperty(){
    let body = {
    }
    this.CustomerService.getAlConditionProperty(body).then((res: any) => {
      if (res.status_code === 200) {
        this.etatBienOptions = res?.data;
      }
    })
  }

  getPlanFinancement(){
    let body = {
      dossierID: this.dossierID
    }
    this.CustomerService.getPlanFinancement(body).then((res: any) => {
      if (res.status_code === 200 && res?.data?.length > 0) {
        this.planFinancement = res?.data[0];
        this.calculateMensualiteTTC();
      }
    })
  }

  savePlanFinancement(){
    let body = {
      dossierID: this.dossierID,
      planFinancement: this.planFinancement
    }

    this.CustomerService.savePlanFinancement(body).then((res: any) => {     
      if (res.status_code === 200) {
        
      }
    })
  }

  getGarantie(){
    let body = {
      dossierID: this.dossierID
    }
    this.CustomerService.getGarantie(body).then((res: any) => {
      if (res.status_code === 200) {
        this.canauxVentes = res?.data;
        this.checkCanaux();
      }
    })
  }

  saveGarantie(){
    let body = {
      dossierID: this.dossierID,
      canauxVentes: this.canauxVentes
    }
    this.CustomerService.saveGarantie(body).then((res: any) => {     
      if (res.status_code === 200) {
        
      }
    })
  }

  depots = []
  getDepot(){
    let body = {
      dossierID: this.dossierID
    }
    console.log("body", body);
    this.CustomerService.getDepot(body).then((res: any) => {
      console.log("res", res);
      if (res.status_code === 200) {
        this.depots = res.data.map((item: any) => {
          return {
            ...item,
            dateEnvoi: item.dateEnvoi ? new Date(item.dateEnvoi) : null
          };
        });
      }
    })
  }

  saveDepot(){
    let body = {
      dossierID: this.dossierID,
      depots: this.depots,
      honorairesFactures: this.planFinancement?.honorairesFactures
    }
    console.log("body", body);
    this.CustomerService.saveDepot(body).then((res: any) => {     
      if (res.status_code === 200) {
        
      }
    })
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

}
