import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig, public  router: Router) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
        console.log('AppComponent initialized');
        if(!localStorage.getItem('isConncted')) {
            this.router.navigateByUrl("auth/login");
        }  
    }
}
