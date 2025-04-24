import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CustomerService } from 'src/app/service/customer.service';

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
  step = 0;
  selectedRole!: Role;
  folderID = null;
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
  messages = [{ severity: 'error', detail: "Ce tiers n'existe pas dans le système" }];
  folderCreatedErrorMessage = [{ severity: 'error', detail: "Champs required" }];
  folderCreatedSuccessMessage = [{ severity: 'success', detail: "Mise à jour effectuée avec succès" }];
  constructor(private CustomerService: CustomerService,
              private route: ActivatedRoute) {
    this.folderID = this.route.snapshot.paramMap.get('dossier_id')
   }

  ngOnInit() {
    
    // this.newTiers = [
    //   { name: 'Ahmed Ben Ali', tel: '06988484', is_complete: false, tier_interv: 0, cin: "EE456702", role: "Caution hypothécaire" },
    //   { name: 'Meryem Ouazzani', tel: '06988485', is_complete: false, tier_interv: 0, cin: "EE456703", role: "Emprunteur" },
    //   { name: 'Hamid Oulhaj', tel: '06988486', is_complete: false, tier_interv: 0, cin: "EE456704", role: "Co-emprunteur" },
    //   { name: 'Khalid Toumi', tel: '06988487', is_complete: false, tier_interv: 0, cin: "EE456705", role: "Caution personnelle et solidaire" },
    //   { name: 'Sanaa Bekkali', tel: '06988488', is_complete: false, tier_interv: 0, cin: "EE456706", role: "Caution hypothécaire" },
    //   { name: 'Yassine Bouchaib', tel: '06988489', is_complete: false, tier_interv: 0, cin: "EE456707", role: "Emprunteur" },
    //   { name: 'Rachid Lahlou', tel: '06988490', is_complete: false, tier_interv: 0, cin: "EE456708", role: "Co-emprunteur" },
    //   { name: 'Imane Tazi', tel: '06988491', is_complete: false, tier_interv: 0, cin: "EE456709", role: "Caution personnelle et solidaire" },
    //   { name: 'Mohamed Hatim', tel: '06988492', is_complete: false, tier_interv: 0, cin: "EE456710", role: "Caution hypothécaire" },
    //   { name: 'Siham Belhaj', tel: '06988493', is_complete: false, tier_interv: 0, cin: "EE456711", role: "Emprunteur" },
    //   { name: 'Nabil Essamadi', tel: '06988494', is_complete: false, tier_interv: 0, cin: "EE456712", role: "Co-emprunteur" },
    //   { name: 'Layla Mourad', tel: '06988495', is_complete: false, tier_interv: 0, cin: "EE456713", role: "Caution personnelle et solidaire" },
    //   { name: 'Karim Chafik', tel: '06988496', is_complete: false, tier_interv: 0, cin: "EE456714", role: "Caution hypothécaire" },
    //   { name: 'Hind Karouia', tel: '06988497', is_complete: false, tier_interv: 0, cin: "EE456715", role: "Emprunteur" },
    // ];
    this.getAllCreditType()
    if(this.folderID != null){
      this.getTiresByFolderID()
      this.step = 2;
    }
  }

  onCreditTypeChange(event: any): void {
    console.log('selectedCreditType city:', this.selectedCreditType); // Logs the selected city object
  }

  closeDialog(){
    this.visibleAddTiers = false;
  }
  showDialog(){
    this.tierExistByCin = false;
    this.tierNexistPas = false;
    this.visibleAddTiers = true;
  }

  tierExistByCin = false;
  tierExistByCinProfile:any = null;
  tierNexistPas = false;
  searchIfExist(){
    let body = {
      clientID: 0,
      CIN: this.cinSearch
    }
    this.tierExistByCinProfile = null;
    this.tierExistByCin = false;
    this.tierNexistPas = false;
    this.CustomerService.getTiereByCIN(body).then((res: any) => {
      if (res?.status_code == 200) {
        this.tierExistByCin = true
        this.tierExistByCinProfile = res?.data;
        
      }
      else{
        this.tierExistByCin = false;
        this.tierNexistPas = true;
        this.tierExistByCinProfile = null;
        
      }
    })
  }

  showTiere(idTier){
    this.tierDialogBySearch = this.tiers[idTier];
    this.visibleShowTiers = true;
  }

  addTierToList() {
    const exists = this.tiers.some(tier => tier?.cin == this.tierExistByCinProfile?.cin);
    if (!exists) {
      this.tiers.push(this.tierExistByCinProfile);
    }
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
        if(this.step == 1){
          this.cretaeFolder();
        }
        else{
          this.step++;
        }
        // this.activeIndex = this.step - 2;
    }
  }

  folderCreatedError = false;
  folderCreatedSuccess = false;
  cretaeFolder(){
    let body = {
      folderID:null,
      tiers: this.tiers,
      creditType: this.selectedCreditType?.code,
    }
    if(this.selectedCreditType && this.tiers?.length > 0){
      console.log("body", body);
      this.step++;
      this.CustomerService.addOrUpdateFolder(body).then((res: any) => {
        console.log("res", res);
        if (res.status_code === 200) {
          this.folderCreatedSuccess = true;
          setTimeout(() => {
            this.folderCreatedSuccess = false;
          }, 4000);
        }
      })
    }
    else{
      this.folderCreatedError = true;
      setTimeout(() => {
        this.folderCreatedError = false;
      }, 4000);
    }
  }

  getTiresByFolderID(){
    let body = {
      folderID: this.folderID
    }
    this.CustomerService.getTiersByFolderID(body).then((res: any) => {
      if (res.status_code === 200) {
        this.tiers = res.data;
        this.selectedCreditType = { code: this.tiers[0]?.creditTypeID, name: this.tiers[0]?.creditTypeLabel};
      }
    })
  }

  getAllCreditType(){
    let body = {
    }
    this.CustomerService.getAllCreditType(body).then((res: any) => {
      console.log("res", res);
      if (res.status_code === 200) {
        this.creditTypes = res.data;
        console.log("creditTypes", this.creditTypes);
      }
    })
  }
}
