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

const routes: Routes = [
  {
    path: '',
    component: ListCustomerFileComponent,
  },
  {
    path: 'add',
    component: AddCustomerFileComponent,
  },
]

@NgModule({
  declarations: [
    ListCustomerFileComponent,
    AddCustomerFileComponent
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
