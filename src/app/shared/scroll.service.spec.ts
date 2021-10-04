import { CheckService } from './check.service';
import { fakeAsync, tick } from '@angular/core/testing';
import { ScrollService } from './scroll.service';

describe('ScrollService', () => {
  
  let service: ScrollService; 

  class MockCheckService {
    constructor(public nativeWindow: Window | null) {}
  }

  it('class should work on the server', () => {
    
    service = new ScrollService((new MockCheckService(null)) as unknown as CheckService);
    expect(service).toBeTruthy();
    expect(service.window).toBe(null); 
  })
  
  it('class should start to work on the bowser', () => {
    
    service =  new ScrollService((new MockCheckService(window)) as unknown as CheckService);
    expect(service).toBeTruthy(); 
    expect(service.window).toBe(window);
  })
  
  it('class methods should work ', fakeAsync(() => {
    
    service =  new ScrollService((new MockCheckService(window)) as unknown as CheckService);
    expect(service).toBeTruthy(); 
    expect(service.window).toBe(window);
    service.goToArrowShow();
    window.dispatchEvent(new Event('scroll'));
    tick(459);

    const arrIdNames: string[] = [ 'bodyBox', 'showImg', 'bodyElement', 'compScreen', 'fB' ];

    arrIdNames.forEach((name: string) => {
      const fackeElem = window.document.createElement('div') as HTMLDivElement; 
    
      fackeElem.setAttribute('id', name);
      window.document.body.appendChild(fackeElem);
    })
    
    service.isNotStop(window);
    service.goTop();
    window.dispatchEvent(new Event('scroll'));
    tick(1800);
    
    let spyO = spyOn(service, 'isNotStop');
    spyO.and.returnValue(true);
    service.goTop();
    window.dispatchEvent(new Event('scroll'));
    tick(1800);

    class FakeHTMLElement {
    style = { background: '', opaity: '', transition: '', zIndex: '' }
    }

    class FakeDocument { 
      getElementById = (arg: string): FakeHTMLElement => new FakeHTMLElement();
    } 

    class FakeWindow { 
      document = new FakeDocument() as unknown as Document; 
      pageYOffset: number = 0;
      clearTimeout(arg: number): void {};
      scrollTo = (x: number, y: number): number => this.pageYOffset = y;
      onscroll = (): void => {};  
      setTimeout = (fn: Function, num: number): number => {
        fn.call(this);
        return 9;
      }

    }

    service =  new ScrollService(
      (new MockCheckService(new FakeWindow() as unknown as Window)) as unknown as CheckService
    );

    service.getElement('id');
    service.goTop(); 
    service.getRangers();
    
  }))

  it('"getViewportWidth" should be work in all browsers', () => {
    
    service =  new ScrollService ( new CheckService('browser' as unknown as object) );
    
    expect(service).toBeTruthy();
    
    expect(  
      service.getViewportWidth({innerWidth: 999} as unknown as Window)
    ).toBe(999);
    expect(  
      service.getViewportWidth({document: {documentElement: {clientWidth: 99}}} as unknown as Window)
    ).toBe(99);
    expect(service.getBodyClWidth({document: {body: {clientWidth: 9}}} as unknown as Window))
    .toBe(9); 
    spyOn ( service ,  'getInnerWidth' ).and.returnValue(0);  
    spyOn ( service ,  'getElClWidth' ).and.returnValue(0);
    expect(service.getViewportWidth({document: {body: {clientWidth: 9}}} as unknown as Window))
    .toBe(9); 
  
    let spyV = spyOn(service, 'getViewportWidth');
    spyV.and.returnValue(999);
    service.getView();
    spyV.and.returnValue(1269);
    service.getView();
    spyV.and.returnValue(459);
    service.getView();
    spyV.and.returnValue(1089);
    service.getView();
    spyV.and.returnValue(639);
    service.getView();
  });
});  
 
 