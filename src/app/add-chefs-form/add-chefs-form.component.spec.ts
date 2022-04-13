import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChefsFormComponent } from './add-chefs-form.component';

describe('AddChefsFormComponent', () => {
  let component: AddChefsFormComponent;
  let fixture: ComponentFixture<AddChefsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChefsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChefsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
