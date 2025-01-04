import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryEditFormComponent } from './subcategory-edit-form.component';

describe('SubcategoryEditFormComponent', () => {
  let component: SubcategoryEditFormComponent;
  let fixture: ComponentFixture<SubcategoryEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcategoryEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoryEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
