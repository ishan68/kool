import { TestBed } from '@angular/core/testing';

import { CakeBuilderService } from './cake-builder.service';

describe('CakeBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CakeBuilderService = TestBed.get(CakeBuilderService);
    expect(service).toBeTruthy();
  });
});
