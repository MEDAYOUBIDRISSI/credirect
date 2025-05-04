import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;
    email!: string;

    constructor(public layoutService: LayoutService, public  router: Router) { }

    signIn(){
        if((this.email == "ayoub@credirect.ma" && this.password == "aaAA12**") || this.email == "othman@credirect.ma" && this.password == "aaAA12**"){
            localStorage.setItem('isConncted', 'true');
            this.router.navigateByUrl("/");
        }
    }
}
