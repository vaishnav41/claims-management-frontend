import { TestBed } from '@angular/core/testing';

import { ClaimTypesService } from './claim-types.service';

describe('ClaimTypesService', () => {
  let service: ClaimTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaimTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
