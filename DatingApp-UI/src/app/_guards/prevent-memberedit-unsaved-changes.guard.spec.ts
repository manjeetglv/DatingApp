import { TestBed } from '@angular/core/testing';

import { PreventMembereditUnsavedChangesGuard } from './prevent-memberedit-unsaved-changes.guard';

describe('PreventMembereditUnsavedChangesGuard', () => {
  let guard: PreventMembereditUnsavedChangesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreventMembereditUnsavedChangesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
