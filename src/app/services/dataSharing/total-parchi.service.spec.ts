import { TestBed } from '@angular/core/testing';

import { TotalParchiService } from './total-parchi.service';

describe('TotalParchiService', () => {
  let service: TotalParchiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalParchiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
