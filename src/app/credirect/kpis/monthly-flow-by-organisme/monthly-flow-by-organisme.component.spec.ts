import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyFlowByOrganismeComponent } from './monthly-flow-by-organisme.component';

describe('MonthlyFlowByOrganismeComponent', () => {
  let component: MonthlyFlowByOrganismeComponent;
  let fixture: ComponentFixture<MonthlyFlowByOrganismeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyFlowByOrganismeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonthlyFlowByOrganismeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
