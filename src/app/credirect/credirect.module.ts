import { CustomerFolderComponent } from './customer-folder/customer-folder.component';
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
import { TabViewModule } from 'primeng/tabview';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { SimulatorCredirectComponent } from './simulator-credirect/simulator-credirect.component';
import { SimulatorCredirectV2Component } from './simulator-credirect-v2/simulator-credirect-v2.component';
import { SliderModule } from 'primeng/slider';
import { CardModule } from 'primeng/card';
import { ListboxModule } from 'primeng/listbox';
import { DialogModule } from 'primeng/dialog';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { AgendaComponent } from './agenda/agenda.component';
import { CustomerFolderMoreInfoComponent } from './customer-folder-more-info/customer-folder-more-info.component';
import { CalendarModule } from 'primeng/calendar';
import { CustomerFolderListComponent } from './customer-folder-list/customer-folder-list.component';
import { CustomerFolderFinancingPlansComponent } from './customer-folder-financing-plans/customer-folder-financing-plans.component';
import { ChipModule } from 'primeng/chip';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EditorModule } from 'primeng/editor';
import { InputSwitchModule } from 'primeng/inputswitch';

const routes: Routes = [
  {
    path: 'customer',
    component: ListCustomerFileComponent,
  },
  {
    path: 'customer/add/:step',
    component: AddCustomerFileComponent,
  },
  {
    path: 'customer/add',
    redirectTo: 'customer/add/0',
    pathMatch: 'full',
  },
  {
    path: 'customer/folder/add',
    component: CustomerFolderComponent,
  },
  {
    path: 'customer/folder/more-info',
    component: CustomerFolderMoreInfoComponent,
  },
  {
    path: 'customer/folder/list',
    component: CustomerFolderListComponent,
  },
  {
    path: 'customer/folder/financing-plans',
    component: CustomerFolderFinancingPlansComponent,
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
  {
    path: 'simulator',
    component: SimulatorCredirectComponent,
  },
  ,
  {
    path: 'simulator-v2',
    component: SimulatorCredirectV2Component,
  },
  {
    path: 'calendar',
    component: AgendaComponent,
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
    InfoCompanyComponent,
    SimulatorCredirectComponent,
    SimulatorCredirectV2Component,
    CustomerFolderComponent,
    AgendaComponent,
    CustomerFolderMoreInfoComponent,
    CustomerFolderListComponent,
    CustomerFolderFinancingPlansComponent
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
    TabViewModule,
    InputTextareaModule,
    RadioButtonModule,
    FormsModule,
    ListboxModule,
    SliderModule,
    CardModule,
    ListboxModule,
    DialogModule,
    FullCalendarModule,
    CalendarModule,
    ChipModule,
    AngularEditorModule,
    EditorModule,
    InputSwitchModule,
    RouterModule.forChild(routes)
  ],
  providers:[
    MessageService
  ]
})
export class CredirectModule { }
