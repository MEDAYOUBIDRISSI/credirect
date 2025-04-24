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
import { DossierTrackingComponent } from './dossier-tracking/dossier-tracking.component';
import { CustomerFolderTimelineComponent } from './customer-folder-timeline/customer-folder-timeline.component';
import { TimelineModule } from 'primeng/timeline';
import { CreditImmobilierComponent } from './applications/credit-immobilier/credit-immobilier.component';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MonthlyFlowByProductComponent } from './kpis/monthly-flow-by-product/monthly-flow-by-product.component';
import { KpiPage1Component } from './kpis/kpi-page-1/kpi-page-1.component';
import { ChartModule } from 'primeng/chart';
import { ComByBqOrgComponent } from './kpis/com-by-bq-org/com-by-bq-org.component';
import { MonthlyFlowByBankComponent } from './kpis/monthly-flow-by-bank/monthly-flow-by-bank.component';
import { MessagesModule } from 'primeng/messages';
import { MonthlyFlowByOrganismeComponent } from './kpis/monthly-flow-by-organisme/monthly-flow-by-organisme.component';
import { CategorieClientComponent } from './kpis/categorie-client/categorie-client.component';
import { FundingCityComponent } from './kpis/funding-city/funding-city.component';
import { CategorieClientV2Component } from './kpis/categorie-client-v2/categorie-client-v2.component';

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
    path: 'customer/folder/edit/:dossier_id',
    component: CustomerFolderComponent,
  },
  {
    path: 'customer/folder/more-info/:client_id',
    component: CustomerFolderMoreInfoComponent,
  },
  {
    path: 'customer/folder/list',
    component: CustomerFolderListComponent,
  },
  {
    path: 'customer/folder/financing-plans/:dossier_id/:depot_id',
    component: CustomerFolderFinancingPlansComponent,
  },
  {
    path: 'customer/folder/folder-timeline/:dossier_id/:depot_id',
    component: CustomerFolderTimelineComponent,
  },
  {
    path: 'customer/folder/credit-immobilier',
    component: CreditImmobilierComponent,
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
  {
    path: 'folder-tracking',
    component: DossierTrackingComponent,
  },
  {
    path: 'kpi-page-1',
    component: KpiPage1Component,
  }
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
    CustomerFolderFinancingPlansComponent,
    DossierTrackingComponent,
    CustomerFolderTimelineComponent,
    CreditImmobilierComponent,
    MonthlyFlowByProductComponent,
    KpiPage1Component,
    ComByBqOrgComponent,
    MonthlyFlowByBankComponent,
    MonthlyFlowByOrganismeComponent,
    CategorieClientComponent,
    FundingCityComponent,
    CategorieClientV2Component
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
    TimelineModule,
    MenuModule,
    PanelMenuModule,
    ChartModule,
    MessagesModule,
    RouterModule.forChild(routes)
  ],
  providers:[
    MessageService
  ]
})
export class CredirectModule { }
