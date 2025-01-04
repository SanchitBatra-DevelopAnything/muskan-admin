import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWiseDetailTotalParchiComponent } from './item-wise-detail-total-parchi.component';

describe('ItemWiseDetailTotalParchiComponent', () => {
  let component: ItemWiseDetailTotalParchiComponent;
  let fixture: ComponentFixture<ItemWiseDetailTotalParchiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemWiseDetailTotalParchiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemWiseDetailTotalParchiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
