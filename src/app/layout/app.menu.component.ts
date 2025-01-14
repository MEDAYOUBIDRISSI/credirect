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
                    { label: 'Agenda', icon: 'pi pi-fw pi-home', routerLink: ['credirect/calendar'] },
                    { label: 'Simulateur et calculette', icon: 'pi pi-fw pi-home' , routerLink: ['credirect/simulator-v2']},
                    { label: 'Fiche client', icon: 'pi pi-fw pi-home', routerLink: ['credirect/customer']},
                    { label: 'Création dossier crédit', icon: 'pi pi-fw pi-home', routerLink: ['credirect/customer/folder/add']},
                    { label: 'Banque et organismes', icon: 'pi pi-fw pi-home', routerLink: ['credirect/bank-file']},
                    { label: 'Mandataires et apporteurs', icon: 'pi pi-fw pi-home', routerLink: ['credirect/agents_contributors']},
                    { label: 'Mandats', icon: 'pi pi-fw pi-home', routerLink: ['credirect/mandats']},
                    { label: 'KPI', icon: 'pi pi-fw pi-home', routerLink: ['credirect/kpi']},

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
