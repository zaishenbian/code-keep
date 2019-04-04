import { TestBed } from '@angular/core/testing';

import { CodeKeepService } from './code-keep.service';

describe('CodeKeepService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CodeKeepService = TestBed.get(CodeKeepService);
    expect(service).toBeTruthy();
  });
});
