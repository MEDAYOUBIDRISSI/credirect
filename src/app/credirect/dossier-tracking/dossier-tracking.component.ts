import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dossier-tracking',
  templateUrl: './dossier-tracking.component.html',
  styleUrl: './dossier-tracking.component.scss'
})
export class DossierTrackingComponent implements OnInit{

  activeIndex = 0;
  steps = [
    { label: 'Phase 1' },
    { label: 'Phase 2' },
    { label: 'Phase 3' }
  ];

  phases = [
    {
      title: "Suivi lors de la saisie du dossier et avant envoi banque",
      statuses: [
        "En montage",
        "Projet Abandonné",
        "Attente complément d’information",
        "Attente document manquant",
        "Validation Directeur"
      ]
    },
    {
      title: "Suivi après l’envoi à la banque et avant sa réponse",
      statuses: [
        "En étude bancaire",
        "Accord banque",
        "Rejet pour complément",
        "Refus banque",
        "Accordé sous condition"
      ]
    },
    {
      title: "Suivi après réponse et pendant la finalisation du dossier",
      statuses: [
        "Offre acceptée",
        "Offre abandonnée",
        "Offre refusée",
        "Retour à charge",
        "Ouverture de compte",
        "Visite médicale",
        "Attente OPC",
        "Attente engagement notaire",
        "En déblocage",
        "Débloqué",
        "En Facturation"
      ]
    }
  ];

  constructor() {}

  ngOnInit(): void {
    
  }

  onStepChange(index: number) {
    this.activeIndex = index;
  }

  nextStep() {
    if (this.activeIndex < this.steps.length - 1) {
      this.activeIndex++;
    }
  }

  previousStep() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }
}
