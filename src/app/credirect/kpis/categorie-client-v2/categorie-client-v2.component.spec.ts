import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieClientV2Component } from './categorie-client-v2.component';

describe('CategorieClientV2Component', () => {
  let component: CategorieClientV2Component;
  let fixture: ComponentFixture<CategorieClientV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieClientV2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategorieClientV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
