import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWindowComponent } from './manage-window.component';

describe('ManageWindowComponent', () => {
  let component: ManageWindowComponent;
  let fixture: ComponentFixture<ManageWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
