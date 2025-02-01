import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFolderMoreInfoComponent } from './customer-folder-more-info.component';

describe('CustomerFolderMoreInfoComponent', () => {
  let component: CustomerFolderMoreInfoComponent;
  let fixture: ComponentFixture<CustomerFolderMoreInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerFolderMoreInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerFolderMoreInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
