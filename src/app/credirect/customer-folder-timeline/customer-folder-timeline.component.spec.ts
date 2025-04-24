import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFolderTimelineComponent } from './customer-folder-timeline.component';

describe('CustomerFolderTimelineComponent', () => {
  let component: CustomerFolderTimelineComponent;
  let fixture: ComponentFixture<CustomerFolderTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerFolderTimelineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerFolderTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
