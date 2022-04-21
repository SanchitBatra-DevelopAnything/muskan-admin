import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlavoursScreenComponent } from './flavours-screen.component';

describe('FlavoursScreenComponent', () => {
  let component: FlavoursScreenComponent;
  let fixture: ComponentFixture<FlavoursScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlavoursScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlavoursScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
