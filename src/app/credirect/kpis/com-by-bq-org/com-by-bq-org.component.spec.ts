import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComByBqOrgComponent } from './com-by-bq-org.component';

describe('ComByBqOrgComponent', () => {
  let component: ComByBqOrgComponent;
  let fixture: ComponentFixture<ComByBqOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComByBqOrgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComByBqOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
