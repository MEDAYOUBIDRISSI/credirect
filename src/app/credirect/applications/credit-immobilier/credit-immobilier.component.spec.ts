import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditImmobilierComponent } from './credit-immobilier.component';

describe('CreditImmobilierComponent', () => {
  let component: CreditImmobilierComponent;
  let fixture: ComponentFixture<CreditImmobilierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditImmobilierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditImmobilierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
