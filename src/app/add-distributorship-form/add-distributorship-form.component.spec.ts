import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDistributorshipFormComponent } from './add-distributorship-form.component';

describe('AddDistributorshipFormComponent', () => {
  let component: AddDistributorshipFormComponent;
  let fixture: ComponentFixture<AddDistributorshipFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDistributorshipFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDistributorshipFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
