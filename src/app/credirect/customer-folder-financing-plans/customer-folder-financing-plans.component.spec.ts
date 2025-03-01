import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFolderFinancingPlansComponent } from './customer-folder-financing-plans.component';

describe('CustomerFolderFinancingPlansComponent', () => {
  let component: CustomerFolderFinancingPlansComponent;
  let fixture: ComponentFixture<CustomerFolderFinancingPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerFolderFinancingPlansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerFolderFinancingPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
