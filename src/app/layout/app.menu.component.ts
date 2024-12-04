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
                    { label: 'Fiche client', icon: 'pi pi-fw pi-home', routerLink: ['customer'] },
                    { label: 'Renseignements Données Bancaires', icon: 'pi pi-fw pi-home'},
                    { label: 'Engagements Données Bancaires', icon: 'pi pi-fw pi-home'},
                    { label: 'Données crédit', icon: 'pi pi-fw pi-home'},
                    { label: 'Dossier Banque', icon: 'pi pi-fw pi-home'}
                ]
            },
            {
                label: 'Autre',
                items: [
                    { label: 'Notif email', icon: 'pi pi-fw pi-home'},
                    { label: 'Infos société', icon: 'pi pi-fw pi-home'},
                ]
            }
        ];
    }
}
