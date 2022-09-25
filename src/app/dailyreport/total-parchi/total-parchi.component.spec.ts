import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalParchiComponent } from './total-parchi.component';

describe('TotalParchiComponent', () => {
  let component: TotalParchiComponent;
  let fixture: ComponentFixture<TotalParchiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalParchiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalParchiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
