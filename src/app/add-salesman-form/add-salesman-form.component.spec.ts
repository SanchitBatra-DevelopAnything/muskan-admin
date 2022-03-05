import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesmanFormComponent } from './add-salesman-form.component';

describe('AddSalesmanFormComponent', () => {
  let component: AddSalesmanFormComponent;
  let fixture: ComponentFixture<AddSalesmanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSalesmanFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSalesmanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
