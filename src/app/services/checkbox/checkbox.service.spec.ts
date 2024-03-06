/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CheckboxService } from './checkbox.service';

describe('Service: Checkbox', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckboxService]
    });
  });

  it('should ...', inject([CheckboxService], (service: CheckboxService) => {
    expect(service).toBeTruthy();
  }));
});
