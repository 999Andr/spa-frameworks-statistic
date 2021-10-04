import { FirstPageService } from './first-page.service';
import { Router  } from '@angular/router';


describe('FirstPageService', () => {
  
  let service: FirstPageService; 

  it('should be work', () => {
    
    class FakeRouter {

      navigate(arg: string[]): void {} 
    }

    service =  new FirstPageService(new FakeRouter() as unknown as Router);
     
    expect(service).toBeTruthy();
    service.set(window) ;
    
    
    class FakeLocation {
      constructor (public pathname: string) {}
    }

    class FakeDocument {
      location;
      constructor (public pathname: string) {
        this.location = new FakeLocation( pathname);
      }
    }

    class FakeHistory {
      go(arg: number): void {}
    }

    class FakeWindow {
      document;
      history = new FakeHistory() as unknown as History;
      
      constructor (public pathname: string) {
        this.document = new FakeDocument(pathname) as unknown as Document;
      }
    }

    let w = new FakeWindow('/charts') as unknown as Window;
    service.doHistory(w);
    service.set(w);
    
    window.dispatchEvent(new Event('popstate'));
    window.dispatchEvent(new Event('beforeunload'));

    let win = new FakeWindow('/') as unknown as Window;
    service.set(win);
    
    spyOn(service, 'isLocation').and.returnValue(true);
    spyOn(service, 'doHistory').and.returnValue(null);
    window.dispatchEvent(new Event('popstate'));
    
    service.doHistory(win);

  });
});