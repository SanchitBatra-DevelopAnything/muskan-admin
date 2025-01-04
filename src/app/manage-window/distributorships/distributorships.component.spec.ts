import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorshipsComponent } from './distributorships.component';

describe('DistributorshipsComponent', () => {
  let component: DistributorshipsComponent;
  let fixture: ComponentFixture<DistributorshipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributorshipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
