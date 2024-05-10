import { TestBed } from '@angular/core/testing';

import { AuthGuardManagerService } from './auth-guard-manager.service';

describe('AuthGuardAdminService', () => {
  let service: AuthGuardManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
