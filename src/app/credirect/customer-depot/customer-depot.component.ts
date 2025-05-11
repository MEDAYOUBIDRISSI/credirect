import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-customer-depot',
  templateUrl: './customer-depot.component.html',
  styleUrl: './customer-depot.component.scss'
})
export class CustomerDepotComponent implements OnInit{

  @ViewChild('dt1') dt1!: Table;

  // Liste des dossiers de crédit
  dossiers = [
    {
      id: 'DOS-001',
      client: 'Ahmed El Amrani',
      type: 'Crédit Immobilier',
      montant: 500000,
      statut: 'En étude bancaire',
      dateCreation: new Date('2023-10-01'),
      conseiller: 'Youssef Benali',
      banque: 'Banque Populaire',
      progression: 50,
      panelMenuItems: this.getPanelMenuItems('DOS-001','DEP-001')    
    },
    {
      id: 'DOS-002',
      client: 'Fatima Zahra',
      type: 'Crédit à la Consommation',
      montant: 100000,
      statut: 'Accordé',
      dateCreation: new Date('2023-10-05'),
      conseiller: 'Karim El Filali',
      banque: 'Attijariwafa Bank',
      progression: 100,
      panelMenuItems: this.getPanelMenuItems('DOS-001','DEP-001')
    },
    {
      id: 'DOS-003',
      client: 'Mohamed Kettani',
      type: 'Mourabaha',
      montant: 300000,
      statut: 'En montage',
      dateCreation: new Date('2023-10-10'),
      conseiller: 'Leila Bouzidi',
      banque: 'BMCE Bank',
      progression: 20,
      panelMenuItems: this.getPanelMenuItems('DOS-001','DEP-001')    
    },
    {
      id: 'DOS-004',
      client: 'Samira El Fassi',
      type: 'Crédit Hypothécaire',
      montant: 750000,
      statut: 'Refusé',
      dateCreation: new Date('2023-09-20'),
      conseiller: 'Youssef Benali',
      banque: 'Société Générale Maroc',
      progression: 100,
      panelMenuItems: this.getPanelMenuItems('DOS-001','DEP-001')
    },
    {
      id: 'DOS-005',
      client: 'Hassan El Mansouri',
      type: 'Crédit d’Investissement',
      montant: 1000000,
      statut: 'En étude bancaire',
      dateCreation: new Date('2023-10-15'),
      conseiller: 'Karim El Filali',
      banque: 'Crédit du Maroc',
      progression: 60,
      panelMenuItems: this.getPanelMenuItems('DOS-001','DEP-001')    
    },
    {
      id: 'DOS-006',
      client: 'Amina Belhaj',
      type: 'Crédit Automobile',
      montant: 150000,
      statut: 'Accordé',
      dateCreation: new Date('2023-10-12'),
      conseiller: 'Leila Bouzidi',
      banque: 'CIH Bank',
      progression: 100,
      panelMenuItems: this.getPanelMenuItems('DOS-001','DEP-001')
    },
    {
      id: 'DOS-007',
      client: 'Omar El Khattabi',
      type: 'Crédit Révolving',
      montant: 20000,
      statut: 'En montage',
      dateCreation: new Date('2023-10-18'),
      conseiller: 'Youssef Benali',
      banque: 'Banque Populaire',
      progression: 30,
      panelMenuItems: this.getPanelMenuItems('DOS-001','DEP-001')    
    },
    {
      id: 'DOS-008',
      client: 'Zineb El Idrissi',
      type: 'Crédit à la Promotion Immobilière',
      montant: 600000,
      statut: 'En étude bancaire',
      dateCreation: new Date('2023-10-20'),
      conseiller: 'Karim El Filali',
      banque: 'Attijariwafa Bank',
      progression: 70,
      panelMenuItems: this.getPanelMenuItems('DOS-001','DEP-001')    
    },
    {
      id: 'DOS-009',
      client: 'Youssef Benchekroun',
      type: 'Crédit-Bail Immobilier',
      montant: 800000,
      statut: 'Accordé',
      dateCreation: new Date('2023-10-22'),
      conseiller: 'Leila Bouzidi',
      banque: 'BMCE Bank',
      progression: 100,
      panelMenuItems: this.getPanelMenuItems('DOS-001','DEP-001')
    },
    {
      id: 'DOS-010',
      client: 'Nadia El Amraoui',
      type: 'Crédit-Bail Mobilier',
      montant: 250000,
      statut: 'Refusé',
      dateCreation: new Date('2023-10-25'),
      conseiller: 'Youssef Benali',
      banque: 'Société Générale Maroc',
      progression: 100,
      panelMenuItems: this.getPanelMenuItems('DOS-001','DEP-001')
    },
  ];

  getPanelMenuItems(dossierId, depotId){
    return [
      {
        label: '',
        icon: 'pi pi-bars',
        items: [
          {
            label: 'Edite',
            icon: 'pi pi-eye',
            routerLink: ['/credirect/customer/folder/edit', dossierId]
          },
          {
            label: 'Plans de financement',
            icon: 'pi pi-pencil',
            routerLink: ['/credirect/customer/folder/financing-plans', dossierId, depotId]
          },
          {
            label: 'Chronologie des dossiers',
            icon: 'pi pi-clock',
            routerLink: ['/credirect/customer/folder/folder-timeline', dossierId, depotId]
          }
        ]
      }
    ];
  }
  // Liste filtrée des dossiers
  filteredDossiers = this.dossiers;

  // Valeur de recherche
  searchValue = '';

  // Tri actif
  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor() {}

  ngOnInit(): void {}

  // Gérer le tri
  onSort(event: any): void {
    this.sortColumn = event.field;
    this.sortDirection = event.order === 1 ? 'asc' : 'desc';
    this.applyFilters(); // Re-filtrer après le tri
  }

  // Appliquer les filtres de recherche
  applyFilters(): void {
    this.filteredDossiers = this.dossiers.filter((dossier) => {
      return (
        dossier.id.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        dossier.client.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        dossier.type.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    });
  }

  // Effacer les filtres
  clear(table: Table): void {
    this.searchValue = '';
    table.clear();
  }

  // Obtenir la sévérité du statut pour PrimeNG Tag
  getStatusSeverity(statut: string): string {
    switch (statut) {
      case 'Accordé':
        return 'success';
      case 'Refusé':
        return 'danger';
      case 'En étude bancaire':
        return 'warning';
      default:
        return 'info';
    }
  }

  // Voir les détails d'un dossier
  viewDetails(dossier: any): void {
    console.log('Voir les détails du dossier :', dossier);
    // Rediriger vers la page de détails ou ouvrir un modal
  }

  // Modifier un dossier
  editDossier(dossier: any): void {
    console.log('Modifier le dossier :', dossier);
    // Rediriger vers la page de modification ou ouvrir un formulaire
  }
}
