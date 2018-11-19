import { TestBed, inject } from '@angular/core/testing';

import { LazyLoadingScriptService } from './lazy-loading-script.service';

describe('LazyLoadingScriptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LazyLoadingScriptService]
    });
  });

  it('should be created', inject([LazyLoadingScriptService], (service: LazyLoadingScriptService) => {
    expect(service).toBeTruthy();
  }));
});
