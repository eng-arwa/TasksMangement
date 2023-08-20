import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { customGuard } from './custom.guard';

describe('customGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => customGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
