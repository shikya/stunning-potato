import { TestBed, async, inject } from '@angular/core/testing';

import { NormalUserGuard } from './normal-user.guard';

describe('NormalUserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NormalUserGuard]
    });
  });

  it('should ...', inject([NormalUserGuard], (guard: NormalUserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
