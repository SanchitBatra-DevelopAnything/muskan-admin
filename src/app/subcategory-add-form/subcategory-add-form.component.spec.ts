import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryAddFormComponent } from './subcategory-add-form.component';

describe('SubcategoryAddFormComponent', () => {
  let component: SubcategoryAddFormComponent;
  let fixture: ComponentFixture<SubcategoryAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcategoryAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoryAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
