import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-folder',
  templateUrl: './customer-folder.component.html',
  styleUrl: './customer-folder.component.scss'
})
export class CustomerFolderComponent implements OnInit{

  tiers: any[]=[];
  newTiers: any[]=[];

  cities!: any[];
  selectedCity!: any;
  valueSlider : number = 0;
  visibleAddTiers = false;
  visibleShowTiers = false;
  cinEstim = "EE570567";
  cinSearch = "";
  tierDialogBySearch:any=null;
  constructor() { }

  ngOnInit() {
    this.tiers = [
      { name: 'Idrissi Mohamed Ayoub', tel: '06988480',is_primary: true, tier_interv: 40, cin: "EE456745" },
      { name: 'Oum kel', tel: '06988481',is_primary: false, tier_interv: 40, cin: "EE456767" },
      { name: 'Othman Credirect', tel: '06988482',is_primary: false, tier_interv: 20, cin: "EE456700" },
    ]
    this.newTiers = [
      { name: 'Ahmed Ben Ali', tel: '06988484', is_primary: false, tier_interv: 0, cin: "EE456702" },
      { name: 'Meryem Ouazzani', tel: '06988485', is_primary: false, tier_interv: 0, cin: "EE456703" },
      { name: 'Hamid Oulhaj', tel: '06988486', is_primary: false, tier_interv: 0, cin: "EE456704" },
      { name: 'Khalid Toumi', tel: '06988487', is_primary: false, tier_interv: 0, cin: "EE456705" },
      { name: 'Sanaa Bekkali', tel: '06988488', is_primary: false, tier_interv: 0, cin: "EE456706" },
      { name: 'Yassine Bouchaib', tel: '06988489', is_primary: false, tier_interv: 0, cin: "EE456707" },
      { name: 'Rachid Lahlou', tel: '06988490', is_primary: false, tier_interv: 0, cin: "EE456708" },
      { name: 'Imane Tazi', tel: '06988491', is_primary: false, tier_interv: 0, cin: "EE456709" },
      { name: 'Mohamed Hatim', tel: '06988492', is_primary: false, tier_interv: 0, cin: "EE456710" },
      { name: 'Siham Belhaj', tel: '06988493', is_primary: false, tier_interv: 0, cin: "EE456711" },
      { name: 'Nabil Essamadi', tel: '06988494', is_primary: false, tier_interv: 0, cin: "EE456712" },
      { name: 'Layla Mourad', tel: '06988495', is_primary: false, tier_interv: 0, cin: "EE456713" },
      { name: 'Karim Chafik', tel: '06988496', is_primary: false, tier_interv: 0, cin: "EE456714" },
      { name: 'Hind Karouia', tel: '06988497', is_primary: false, tier_interv: 0, cin: "EE456715" }
    ];

    this.cities = [
        { name: 'Crédit immobilier', code: 'CIM' },
        { name: 'Crédit consommation', code: 'CC' },
        { name: 'Crédit hypothécaire', code: 'CH' },
        { name: 'Crédit-Bail Immobilier', code: 'CBI' },
        { name: 'Crédit-Bail Mobilier', code: 'CBM' },
        { name: 'Crédit à la promotion immobilière', code: 'CPI' },
        { name: 'Crédit d’investissement', code: 'CI' }
    ];
  }

  onCityChange(event: any): void {
    console.log('Selected city:', event.value); // Logs the selected city object
    console.log('selectedCity city:', this.selectedCity); // Logs the selected city object
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
}
