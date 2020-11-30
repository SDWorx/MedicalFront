/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DeviceipService } from './deviceip.service';

describe('Service: Deviceip', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceipService]
    });
  });

  it('should ...', inject([DeviceipService], (service: DeviceipService) => {
    expect(service).toBeTruthy();
  }));
});
