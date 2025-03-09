import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierTrackingComponent } from './dossier-tracking.component';

describe('DossierTrackingComponent', () => {
  let component: DossierTrackingComponent;
  let fixture: ComponentFixture<DossierTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DossierTrackingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DossierTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
