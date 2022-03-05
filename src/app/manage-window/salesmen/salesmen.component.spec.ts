import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesmenComponent } from './salesmen.component';

describe('SalesmenComponent', () => {
  let component: SalesmenComponent;
  let fixture: ComponentFixture<SalesmenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesmenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesmenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
