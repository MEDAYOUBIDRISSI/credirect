import { Component, OnInit } from '@angular/core';

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
    { label: 'Garantie et Commentaire' },
  ];

  // Index de l'étape active
  activeIndex = 0;

  // Données du plan de financement
  planFinancement = {
    objetCredit: '',
    descriptionProjet: '',
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
    prixVente: null
  };

  // Options pour l'objet du crédit
  objetCreditOptions = [
    { label: 'Acquisition', value: 'Acquisition' },
    { label: 'Acquisition + Construction', value: 'Acquisition + Construction' },
    { label: 'Acquisition + Aménagement', value: 'Acquisition + Aménagement' },
    { label: 'Acquisition de part', value: 'Acquisition de part' },
    { label: 'Acquisition de part + Travaux de Construction', value: 'Acquisition de part + Travaux de Construction' },
    { label: 'Acquisition de part + Travaux d’Aménagement', value: 'Acquisition de part + Travaux d’Aménagement' },
    { label: 'Acquisition de part + Rachat de Crédit', value: 'Acquisition de part + Rachat de Crédit' },
    { label: 'Travaux de Construction', value: 'Travaux de Construction' },
    { label: 'Travaux d’Aménagement', value: 'Travaux d’Aménagement' },
    { label: 'Travaux de Finition', value: 'Travaux de Finition' },
    { label: 'Rachat de Crédit', value: 'Rachat de Crédit' },
    { label: 'Rachat + Travaux d’Aménagement', value: 'Rachat + Travaux d’Aménagement' },
    { label: 'Rachat + Travaux de Construction', value: 'Rachat + Travaux de Construction' },
    { label: 'Crédit in-fine', value: 'Crédit in-fine' },
    { label: 'VEFA', value: 'VEFA' },
    { label: 'Relais', value: 'Relais' },
  ];

  // Options pour la nature du bien
  natureBienOptions = [
    { label: 'Appartement', value: 'Appartement' },
    { label: 'Terrain', value: 'Terrain' },
    { label: 'Villa', value: 'Villa' },
    { label: 'Maison Individuelle', value: 'Maison Individuelle' },
    { label: 'Duplex', value: 'Duplex' },
    { label: 'Studio', value: 'Studio' },
    { label: 'Plateau Bureau', value: 'Plateau Bureau' },
    { label: 'Magasin', value: 'Magasin' },
    { label: 'Dépôt', value: 'Dépôt' },
    { label: 'Pavillon', value: 'Pavillon' },
  ];

  // Options pour l'affectation du bien
  affectationBienOptions = [
    { label: 'Bien objet du crédit (principal)', value: 'Principal' },
    { label: 'Bien supplémentaire (secondaire)', value: 'Secondaire' },
    { label: 'Bien de substitution', value: 'Substitution' },
  ];

  // Options pour l'usage du bien
  usageBienOptions = [
    { label: 'Résidence principale', value: 'Résidence principale' },
    { label: 'Résidence secondaire', value: 'Résidence secondaire' },
    { label: 'Commercial', value: 'Commercial' },
    { label: 'Professionnel', value: 'Professionnel' },
  ];

  // Options pour l'état du bien
  etatBienOptions = [
    { label: 'Neuf', value: 'Neuf' },
    { label: 'Récent', value: 'Récent' },
    { label: 'Ancien', value: 'Ancien' },
  ];

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
    { id: 1, name: 'Hypothèque en 1er rang au profit de la banque sur le TF ' },
    { id: 2, name: 'Caution hypothécaire de …… au profit de la banque ' },
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

  constructor() {}

  ngOnInit(): void {
    this.checkCanaux()
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

  frequenceOptions = ['Mensuelle', 'Trimestrielle', 'Semestrielle', 'Annuelle'];
  assuranceOptions = ['Mensuelle', 'Prime Unique'];

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

}
