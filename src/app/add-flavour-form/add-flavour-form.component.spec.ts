import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFlavourFormComponent } from './add-flavour-form.component';

describe('AddFlavourFormComponent', () => {
  let component: AddFlavourFormComponent;
  let fixture: ComponentFixture<AddFlavourFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFlavourFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFlavourFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
