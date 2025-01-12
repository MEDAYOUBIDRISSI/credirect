import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                    { label: 'Agenda', icon: 'pi pi-fw pi-home', routerLink: ['credirect/customer'] },
                    { label: 'Simulateur et calculette', icon: 'pi pi-fw pi-home' , routerLink: ['credirect/banking-informations']},
                    { label: 'Fiche client', icon: 'pi pi-fw pi-home', routerLink: ['credirect/banking-data-commitments']},
                    { label: 'Création dossier crédit', icon: 'pi pi-fw pi-home', routerLink: ['credirect/data-credits']},
                    { label: 'Banque et organismes', icon: 'pi pi-fw pi-home', routerLink: ['credirect/bank-file']},
                    { label: 'Mandataires et apporteurs', icon: 'pi pi-fw pi-home', routerLink: ['credirect/bank-file']},
                    { label: 'Mandats', icon: 'pi pi-fw pi-home', routerLink: ['credirect/bank-file']},
                    { label: 'KPI', icon: 'pi pi-fw pi-home', routerLink: ['credirect/bank-file']},

                ]
            },
            {
                label: 'Autre',
                items: [
                    { label: 'Notif email', icon: 'pi pi-fw pi-home', routerLink: ['credirect/notif-email']},
                    { label: 'Infos société', icon: 'pi pi-fw pi-home', routerLink: ['credirect/info-company']},
                ]
            }
        ];
    }
}
