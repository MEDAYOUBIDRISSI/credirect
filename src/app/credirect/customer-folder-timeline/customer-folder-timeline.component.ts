import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer-folder-timeline',
  templateUrl: './customer-folder-timeline.component.html',
  styleUrl: './customer-folder-timeline.component.scss'
})
export class CustomerFolderTimelineComponent implements OnInit{

  events: any[]=[];
  changeStatus = false
  showMore = false
  // Options pour l'objet du crédit
  statutDepot = [
    { label: 'Envoyer à la banque', value: 3 },
    { label: 'En étude bancaire', value: 4 },
    { label: 'Réponse de la banque', value: 5 },
    { label: 'En attente de la réponse du client', value: 9 },
    { label: 'Réponse du client', value: 10 },
    { label: 'Livré', value: 11 }
  ];
  
   accordDepot = [
    { label: 'Accord', value: 4 },
    { label: 'Accordé sous condition', value: 5},
    { label: 'En attente', value: 2 },
    { label: 'Refus', value: 3 }
  ];
  accordClient = [
    { label: 'Accord', value: 4 },
    { label: 'Accordé sous condition', value: 5},
    { label: 'En attente', value: 2 },
    { label: 'Refus', value: 3 }
  ];

  dossierID:any=null
  depotID:any=null
  is_accord:any=null
  is_accord_client:any=null
  message:any=null
  status:any=null
  constructor(private CustomerService: CustomerService, private route: ActivatedRoute) {
      this.dossierID = this.route.snapshot.paramMap.get('dossier_id')
      this.depotID = this.route.snapshot.paramMap.get('depot_id')
        this.events = [
            // { status: 'Dépôt créé', date: '15/10/2020 10:30', icon: 'pi pi-play-', color: '#8ecae6', is_accord: 0, return: "" },
            // { status: 'Envoyer à la banque', date: '15/10/2020 14:00', icon: 'pi pi-send', color: '#219ebc', is_accord: 1, return: "Lorem ipsum dolor sit amet, consectetur adipisicing elit 2" },
            // { status: 'En étude bancaire ', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#FF9800', is_accord: 2, return: "Lorem ipsum dolor sit amet, consectetur adipisicing elit 3 ..." },
            // { status: 'Réponse de la banque', date: '25/10/2020 16:15', icon: 'pi pi-gift', color: '#023e8a', is_accord: 3 , return: "Lorem ipsum dolor sit amet, consectetur adipisicing elit 4"},
            // { status: 'Envoyer à la banque', date: '15/11/2020 14:00', icon: 'pi pi-send', color: '#219ebc', is_accord: 1, return: "Lorem ipsum dolor sit amet, consectetur adipisicing elit 5 ..." },
            // { status: 'Réponse de la banque', date: '15/12/2020 16:15', icon: 'pi pi-gift', color: '#023e8a', is_accord: 4, return: "Lorem ipsum dolor sit amet, consectetur adipisicing elit 6 ..." },
            // { status: 'Envoyer à la banque', date: '15/01/2021 14:00', icon: 'pi pi-send', color: '#219ebc', is_accord: 1, return: "Lorem ipsum dolor sit amet, consectetur adipisicing elit 7 ..." },
            // { status: 'Réponse de la banque', date: '15/02/2021 16:15', icon: 'pi pi-gift', color: '#023e8a', is_accord: 5, return: "Lorem ipsum dolor sit amet, consectetur adipisicing elit 8 ..." },
            // { status: 'En attente de la réponse du client', date: '15/02/2021 16:15', icon: 'pi pi-spinner', color: '#FF9800', is_accord: 7, return: "Lorem ipsum dolor sit amet, consectetur adipisicing elit 9 ..." },
            // { status: 'Réponse du client', date: '15/02/2021 16:15', icon: 'pi pi-user-edit', color: '#2dc653', is_accord: 6, return: "Lorem ipsum dolor sit amet, consectetur adipisicing elit 10 ..." },
            // { status: 'Réponse du client', date: '15/02/2021 16:15', icon: 'pi pi-user-edit', color: '#2dc653', is_accord: 8, return: "Lorem ipsum dolor sit amet, consectetur adipisicing elit 11 ..." },
            // { status: 'Livré', date: '16/03/2021 10:00', icon: 'pi pi-check', color: '#607D8B', is_accord: 9, return: "Lorem ipsum dolor sit amet, consectetur adipisicing elit 12" }
        ];
    }

    ngOnInit() {
      this.getCreditTimeline()
    }

    getCreditTimeline(){
    let body = {
      dossierID: this.dossierID,
      id_depot: this.depotID,
    }
    this.CustomerService.getCreditTimeline(body).then((res: any) => {
      console.log("res", res);
      if (res.status_code === 200) {
        this.events = res?.data;
        console.log("getCreditTimeline", res);
        
      }
    })
  }

  saveCreditStatus(){
    let body = {
      id_credit: Number(this.dossierID),
      id_depot: Number(this.depotID),
      is_accord: this.is_accord,
      is_accord_client: this.is_accord_client,
      status: this.status,
      message: this.message
    }
    this.CustomerService.saveCreditStatus(body).then((res: any) => {
      if (res.status_code === 200) {
        this.getCreditTimeline();
        this.is_accord = null;
        this.status = null;
        this.is_accord_client = null;
        this.message = null;
        this.changeStatus = false;
      }
      else{

      }
      
    })
  }
}
