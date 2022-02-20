import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryItemComponent } from './subcategory-item.component';

describe('SubcategoryItemComponent', () => {
  let component: SubcategoryItemComponent;
  let fixture: ComponentFixture<SubcategoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcategoryItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
