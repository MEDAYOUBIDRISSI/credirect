import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDepotComponent } from './customer-depot.component';

describe('CustomerDepotComponent', () => {
  let component: CustomerDepotComponent;
  let fixture: ComponentFixture<CustomerDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDepotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
