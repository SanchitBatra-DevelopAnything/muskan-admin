import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomOrderViewComponent } from './custom-order-view.component';

describe('CustomOrderViewComponent', () => {
  let component: CustomOrderViewComponent;
  let fixture: ComponentFixture<CustomOrderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomOrderViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
