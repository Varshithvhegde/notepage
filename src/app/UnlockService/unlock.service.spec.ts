import { TestBed } from '@angular/core/testing';

import { UnlockService } from './unlock.service';

describe('UnlockService', () => {
  let service: UnlockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnlockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
