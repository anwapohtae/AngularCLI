/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ThaidataService } from './thaidata.service';

describe('Service: Thaidata', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThaidataService]
    });
  });

  it('should ...', inject([ThaidataService], (service: ThaidataService) => {
    expect(service).toBeTruthy();
  }));
});
