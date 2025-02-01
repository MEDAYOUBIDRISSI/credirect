import { Component, OnInit } from '@angular/core';

interface Role {
  name: string,
  code: string
}
@Component({
  selector: 'app-customer-folder',
  templateUrl: './customer-folder.component.html',
  styleUrl: './customer-folder.component.scss'
})

export class CustomerFolderComponent implements OnInit{

  tiers: any[]=[];
  newTiers: any[]=[];

  creditTypes!: any[];
  selectedCreditType!: any;
  valueSlider : number = 0;
  visibleAddTiers = false;
  visibleShowTiers = false;
  cinEstim = "EE570567";
  cinSearch = "";
  tierDialogBySearch:any=null;
  items: any[]=[];
  isSelected1 = false;
  isSelected2 = false;
  step = 2;
  selectedRole!: Role;
  constructor() { }

  ngOnInit() {
    this.tiers = [
      { name: 'Idrissi Mohamed Ayoub', tel: '06988480', is_complete: true, tier_interv: 40, cin: "EE456745", role: "Emprunteur" },
      { name: 'Oum kel', tel: '06988481', is_complete: false, tier_interv: 40, cin: "EE456767", role: "Caution personnelle et solidaire" },
      { name: 'Othman Credirect', tel: '06988482', is_complete: false, tier_interv: 20, cin: "EE456700", role: "Co-emprunteur" },
    ];
    
    this.newTiers = [
      { name: 'Ahmed Ben Ali', tel: '06988484', is_complete: false, tier_interv: 0, cin: "EE456702", role: "Caution hypothécaire" },
      { name: 'Meryem Ouazzani', tel: '06988485', is_complete: false, tier_interv: 0, cin: "EE456703", role: "Emprunteur" },
      { name: 'Hamid Oulhaj', tel: '06988486', is_complete: false, tier_interv: 0, cin: "EE456704", role: "Co-emprunteur" },
      { name: 'Khalid Toumi', tel: '06988487', is_complete: false, tier_interv: 0, cin: "EE456705", role: "Caution personnelle et solidaire" },
      { name: 'Sanaa Bekkali', tel: '06988488', is_complete: false, tier_interv: 0, cin: "EE456706", role: "Caution hypothécaire" },
      { name: 'Yassine Bouchaib', tel: '06988489', is_complete: false, tier_interv: 0, cin: "EE456707", role: "Emprunteur" },
      { name: 'Rachid Lahlou', tel: '06988490', is_complete: false, tier_interv: 0, cin: "EE456708", role: "Co-emprunteur" },
      { name: 'Imane Tazi', tel: '06988491', is_complete: false, tier_interv: 0, cin: "EE456709", role: "Caution personnelle et solidaire" },
      { name: 'Mohamed Hatim', tel: '06988492', is_complete: false, tier_interv: 0, cin: "EE456710", role: "Caution hypothécaire" },
      { name: 'Siham Belhaj', tel: '06988493', is_complete: false, tier_interv: 0, cin: "EE456711", role: "Emprunteur" },
      { name: 'Nabil Essamadi', tel: '06988494', is_complete: false, tier_interv: 0, cin: "EE456712", role: "Co-emprunteur" },
      { name: 'Layla Mourad', tel: '06988495', is_complete: false, tier_interv: 0, cin: "EE456713", role: "Caution personnelle et solidaire" },
      { name: 'Karim Chafik', tel: '06988496', is_complete: false, tier_interv: 0, cin: "EE456714", role: "Caution hypothécaire" },
      { name: 'Hind Karouia', tel: '06988497', is_complete: false, tier_interv: 0, cin: "EE456715", role: "Emprunteur" },
    ];

    this.creditTypes = [
        { name: 'Crédit immobilier (le pourcentage est requis)', code: 'CIM' },
        { name: 'Crédit consommation', code: 'CC' },
        { name: 'Crédit hypothécaire (le pourcentage est requis)', code: 'CH' },
        { name: 'Crédit-Bail Immobilier (le pourcentage est requis)', code: 'CBI' },
        { name: 'Crédit-Bail Mobilier (le pourcentage est requis)', code: 'CBM' },
        { name: 'Crédit à la promotion immobilière', code: 'CPI' },
        { name: 'Crédit d’investissement', code: 'CI' }
    ];
  }

  onCreditTypeChange(event: any): void {
    console.log('Selected city:', event.value); // Logs the selected city object
    console.log('selectedCreditType city:', this.selectedCreditType); // Logs the selected city object
  }

  closeDialog(){
    this.visibleAddTiers = false;
  }
  showDialog(){
    this.visibleAddTiers = true;
  }

  tierExistByCin = false;
  tierExistByCinProfile = null;
  searchIfExist(){
    const result = this.newTiers.find(tier => tier.cin == this.cinSearch);
    if(result){
      this.tierExistByCin = true
      this.tierExistByCinProfile = result;
    }else{
      this.tierExistByCin = false;
      this.tierExistByCinProfile = null;
    }
  }

  showTiere(idTier){
    this.tierDialogBySearch = this.tiers[idTier];
    this.visibleShowTiers = true;
  }

  addTierToList(){
    this.tiers.push(this.tierExistByCinProfile) 
    console.log(this.tierExistByCinProfile)
    this.visibleAddTiers = false;
  }

  //////////////////////////////
  selectCard(cardNumber: number) {
    if (cardNumber === 1) {
      this.isSelected1 = true;
      this.isSelected2 = false;
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
      this.isSelected2 = true;
      this.isSelected1 = false;
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
  }

  isNextDisabled(): boolean {
    if(this.step == 1){
      return false;
    }
    else{
      return true;
    }
  }

  goToPreviousStep() {
    if (this.step > 0) {
        this.step--;
        // this.activeIndex = this.step - 2;
    }
}

  goToNextStep() {
    if (this.step < 4) {
        this.step++;
        // this.activeIndex = this.step - 2;
    }
}
}
