import { TestBed } from '@angular/core/testing';
import { CheckService } from './check.service';

describe('CheckService', () => {
  
  let service: CheckService;

  it('should be work on the server', () => {
    service = new CheckService('server' as unknown as object);
    expect(service).toBeTruthy();
    expect(service.nativeWindow).toBe(null);
  });
  
  it('should be work on the browser', () => {
    service = new CheckService('browser' as unknown as object);
    expect(service).toBeTruthy();
    expect(service.nativeWindow).toBe(window);
  });

});