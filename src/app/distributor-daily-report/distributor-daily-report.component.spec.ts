import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorDailyReportComponent } from './distributor-daily-report.component';

describe('DistributorDailyReportComponent', () => {
  let component: DistributorDailyReportComponent;
  let fixture: ComponentFixture<DistributorDailyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributorDailyReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorDailyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
