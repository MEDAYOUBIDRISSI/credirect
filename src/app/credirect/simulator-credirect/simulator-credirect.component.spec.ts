import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorCredirectComponent } from './simulator-credirect.component';

describe('SimulatorCredirectComponent', () => {
  let component: SimulatorCredirectComponent;
  let fixture: ComponentFixture<SimulatorCredirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulatorCredirectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimulatorCredirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
