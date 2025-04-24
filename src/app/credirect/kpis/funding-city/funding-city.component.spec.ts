import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingCityComponent } from './funding-city.component';

describe('FundingCityComponent', () => {
  let component: FundingCityComponent;
  let fixture: ComponentFixture<FundingCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundingCityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FundingCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
