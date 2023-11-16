import { TestBed } from '@angular/core/testing';

import { RolebaseAuthService } from './rolebase-auth.service';

describe('RolebaseAuthService', () => {
  let service: RolebaseAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolebaseAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
