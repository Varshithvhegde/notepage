import { TestBed } from '@angular/core/testing';

import { ContentresolverService } from './contentresolver.service';

describe('ContentresolverService', () => {
  let service: ContentresolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentresolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
