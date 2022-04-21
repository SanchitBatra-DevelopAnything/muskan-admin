import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignCategoryScreenComponent } from './design-category-screen.component';

describe('DesignCategoryScreenComponent', () => {
  let component: DesignCategoryScreenComponent;
  let fixture: ComponentFixture<DesignCategoryScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignCategoryScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignCategoryScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
