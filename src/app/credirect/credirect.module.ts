import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCustomerFileComponent } from './list-customer-file/list-customer-file.component';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { SpeedDialModule } from 'primeng/speeddial';
import { MessageService } from 'primeng/api';
import { AddCustomerFileComponent } from './add-customer-file/add-customer-file.component';
import { StepsModule } from 'primeng/steps';
import { BankingInformationsComponent } from './banking-informations/banking-informations.component';
import { BankingDataCommitmentsComponent } from './banking-data-commitments/banking-data-commitments.component';
import { DataCreditsComponent } from './data-credits/data-credits.component';
import { BankFileComponent } from './bank-file/bank-file.component';
import { NotifEmailComponent } from './notif-email/notif-email.component';
import { InfoCompanyComponent } from './info-company/info-company.component';

const routes: Routes = [
  {
    path: 'customer',
    component: ListCustomerFileComponent,
  },
  {
    path: 'customer/add',
    component: AddCustomerFileComponent,
  },
  {
    path: 'banking-informations',
    component: BankingInformationsComponent,
  },
  {
    path: 'banking-data-commitments',
    component: BankingDataCommitmentsComponent,
  },
  {
    path: 'data-credits',
    component: DataCreditsComponent,
  },
  {
    path: 'bank-file',
    component: BankFileComponent,
  },
  {
    path: 'notif-email',
    component: NotifEmailComponent,
  },
  {
    path: 'info-company',
    component: InfoCompanyComponent,
  },
]

@NgModule({
  declarations: [
    ListCustomerFileComponent,
    AddCustomerFileComponent,
    BankingInformationsComponent,
    BankingDataCommitmentsComponent,
    DataCreditsComponent,
    BankFileComponent,
    NotifEmailComponent,
    InfoCompanyComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    HttpClientModule,
    InputTextModule,
    TagModule, 
    DropdownModule,
    MultiSelectModule,
    ProgressBarModule,
    ButtonModule,
    SpeedDialModule,
    ToastModule,
    StepsModule,
    RouterModule.forChild(routes)
  ],
  providers:[
    MessageService
  ]
})
export class CredirectModule { }
