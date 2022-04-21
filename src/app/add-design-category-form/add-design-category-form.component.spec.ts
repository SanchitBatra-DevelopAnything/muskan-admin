import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDesignCategoryFormComponent } from './add-design-category-form.component';

describe('AddDesignCategoryFormComponent', () => {
  let component: AddDesignCategoryFormComponent;
  let fixture: ComponentFixture<AddDesignCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDesignCategoryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDesignCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
