import { TestBed } from '@angular/core/testing';

import { PersonRestServiceService } from './person-rest-service.service';

describe('PersonRestServiceService', () => {
  let service: PersonRestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonRestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
