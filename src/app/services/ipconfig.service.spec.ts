import { TestBed } from '@angular/core/testing';

import { IpconfigService } from './ipconfig.service';

describe('IpconfigService', () => {
  let service: IpconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
