/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RachkarnService } from './rachkarn.service';

describe('Service: Rachkarn', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RachkarnService]
    });
  });

  it('should ...', inject([RachkarnService], (service: RachkarnService) => {
    expect(service).toBeTruthy();
  }));
});
