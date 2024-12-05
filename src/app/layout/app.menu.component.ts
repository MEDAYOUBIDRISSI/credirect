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
                    { label: 'Fiche client', icon: 'pi pi-fw pi-home', routerLink: ['credirect/customer'] },
                    { label: 'Renseignements Données Bancaires', icon: 'pi pi-fw pi-home' , routerLink: ['credirect/banking-informations']},
                    { label: 'Engagements Données Bancaires', icon: 'pi pi-fw pi-home', routerLink: ['credirect/banking-data-commitments']},
                    { label: 'Données crédit', icon: 'pi pi-fw pi-home', routerLink: ['credirect/data-credits']},
                    { label: 'Dossier Banque', icon: 'pi pi-fw pi-home', routerLink: ['credirect/bank-file']}
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
