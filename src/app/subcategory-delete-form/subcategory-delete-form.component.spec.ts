import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryDeleteFormComponent } from './subcategory-delete-form.component';

describe('SubcategoryDeleteFormComponent', () => {
  let component: SubcategoryDeleteFormComponent;
  let fixture: ComponentFixture<SubcategoryDeleteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcategoryDeleteFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoryDeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
