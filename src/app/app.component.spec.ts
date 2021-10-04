import { Component, Input } from '@angular/core';
import { fakeAsync, tick, ComponentFixture, TestBed} from '@angular/core/testing';
import { CheckService } from './shared/check.service';
import { FirstPageService } from './first-page.service';
import { ScrollService } from './shared/scroll.service'; 
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { AppModule } from './app.module';
import { routes, AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;

@Component({selector: 'ngx-base', template: ''})
class BaseStubComponent {
  @Input() results!: any;
  @Input() scheme!: any;
  @Input() gradient!: boolean ;
  @Input() legend!: any;
  @Input() showLabels!: boolean ;
  @Input() showLegend!: boolean ;
  @Input() xAxis!: boolean ;
  @Input() yAxis!: boolean ;
  @Input() showXAxisLabel!: boolean;
  @Input() showYAxisLabel!: boolean ;
  @Input() view!: any;
  @Input() xAxisLabel!: string;
  @Input() yAxisLabel!: string;
  @Input() legendPosition!: any;
}

@Component({selector: 'ngx-charts-pie-chart', template: ''})
class FirstStubComponent { 
  @Input() results!: any;
  @Input() view!: any; 
  @Input() scheme!: any;
  @Input() single!: any;
  @Input() gradient!: any;
  @Input() legend!: any;
  @Input() legendPosition!: any;
  @Input() labels!: any;
  @Input() doughnut!: any;
}

@Component({selector: 'ngx-charts-bar-vertical-normalized', template: ''})
class SecondStubComponent extends BaseStubComponent{
}

@Component({selector: 'ngx-charts-bar-vertical-stacked', template: ''})
class ThirdStubComponent extends BaseStubComponent{
}


describe('AppComponent & AppModule', () => {
  
  beforeEach(fakeAsync(() => {
    TestBed
      .configureTestingModule({ imports: [AppModule], })
        .overrideModule(ChartsModule, {
        remove: { 
            imports: [ NgxChartsModule ] 
          },
          add: {  
            declarations: [
              FirstStubComponent,
              SecondStubComponent,
              ThirdStubComponent
            ]
          }
        })
          .compileComponents()
            .then(() => {
              fixture = TestBed.createComponent(AppComponent);
              
              comp = fixture.componentInstance;
              fixture.detectChanges();
              tick();
            });
  }));

  it('should create', () => {
    expect(comp).not.toBeNull();
    expect(comp.title).toEqual('frameworks');
  });
 
});



describe('AppComponent', () => {
  
  class MockCheckService {
    constructor(public nativeWindow: Window | null) {}
  }

  class MockFirstPageService {
     constructor(public router: Router) {}
     set(w: Window): void {};
  }
  
  class MockRouter { 
    navigate(arg: string[]): void {} 
  }

  it('class should work on the server', () => {
    TestBed.configureTestingModule({
    
      providers: [
        AppComponent,
        { provide: ScrollService,  
          useFactory: () => new ScrollService(
            new MockCheckService(null) as unknown as CheckService),
          deps: [] 
        },
        { provide: FirstPageService,  
          useFactory: () => new FirstPageService(new MockRouter() as unknown as Router),
          deps: [] 
        }
      ]
    }) ;
  
    comp = TestBed.inject(AppComponent);
    expect(comp).toBeTruthy();
    comp.mainAppCompMethod(null);
  });


  it('class should start working in the browser', fakeAsync(() => {
    TestBed.configureTestingModule({
    
      providers: [
        AppComponent,
        { provide: CheckService, useFactory: () => new MockCheckService(window), deps: [] },
        { provide: FirstPageService,  
          useFactory: () => new MockFirstPageService(new MockRouter() as unknown as Router),
          deps: [] 
        }
      ]
    });
  
    comp = TestBed.inject(AppComponent);
    
    expect(comp).toBeTruthy(); 
    comp.firstValue = false;
    comp.mainAppCompMethod({} as unknown as Window);

  }));
});


import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement, Type } from '@angular/core';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { ChartsModule } from './charts/charts.module';

let router: Router;
let location: SpyLocation;

describe('AppComponent & RouterTestingModule', () => {
  beforeEach(fakeAsync(() => {
    TestBed
        .configureTestingModule({
          imports: [
            AppModule,
            RouterTestingModule.withRoutes(routes),
          ],
        })
        .overrideModule(ChartsModule, {
        remove: { 
            imports: [ NgxChartsModule ] 
          },
          add: {  
            declarations: [
              FirstStubComponent,
              SecondStubComponent,
              ThirdStubComponent
            ]
          }
        })
        .compileComponents();
  }));

  it('should navigate to "/" immediately', fakeAsync(() => {
    createComponent();
    tick(); 
    expectPathToBe('/', 'after initialNavigation()');
  }));

  it('should start to navigate to "Charts" on click ', fakeAsync(() => {
    createComponent();
    window.dispatchEvent(new Event('click'));
    avance();
    expectPathToBe('/charts');
  }));

  it('should start to navigate to "Charts" on scroll ', fakeAsync(() => {
    createComponent();
    window.dispatchEvent(new Event('scroll'));
    avance();
    expectPathToBe('/charts');
  }));

});


import { NgModuleFactoryLoader } from '@angular/core';
import { SpyNgModuleFactoryLoader } from '@angular/router/testing';
 
import { ChartsComponent } from './charts/charts.component';
import { ChartsRoutingModule } from './charts/charts-routing.module';

let loader: SpyNgModuleFactoryLoader;
let firstPage: FirstPageService;


describe('AppComponent & Lazy Loading ', () => {
  
  beforeEach(fakeAsync(() => {
    TestBed
        .configureTestingModule({
          imports: [
            AppModule,
            RouterTestingModule.withRoutes(routes),
          ],
        })
        .overrideModule(ChartsModule, {
        remove: { 
            imports: [ NgxChartsModule ] 
          },
          add: {  
            declarations: [
              FirstStubComponent,
              SecondStubComponent,
              ThirdStubComponent
            ]
          }
        })
        .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
   
    createComponent();
    loader = TestBed.inject(NgModuleFactoryLoader) as SpyNgModuleFactoryLoader;
    loader.stubbedModules = {expected: ChartsModule};
    router.resetConfig([{path: 'charts', loadChildren: 'expected'}]);
  }));

  it('should navigate to "Charts" on click', fakeAsync(() => {
    window.dispatchEvent(new Event('click'));
    avance();
    expectPathToBe('/charts');
    expectElementOf(ChartsComponent);
  
  }));

  it('should navigate to "Charts" on scroll', fakeAsync(() => {
    window.dispatchEvent(new Event('scroll'));
    avance();
    expectPathToBe('/charts');
    expectElementOf(ChartsComponent);
  }));

  it('can navigate to "Charts" when location URL change', fakeAsync(() => {
    location.go('/charts');
    avance();
    expectPathToBe('/charts');
    expectElementOf(ChartsComponent);
  }));

});


function avance(): void {
  tick();                   
  fixture.detectChanges();
  tick();                 
}

function createComponent() {
  
  fixture = TestBed.createComponent(AppComponent);
  comp = fixture.componentInstance;

  const injector = fixture.debugElement.injector;
  location = injector.get(Location) as SpyLocation;
  router = injector.get(Router); 
  router.initialNavigation();
  
  avance();
}

function expectPathToBe(path: string, expectationFailOutput?: any) {
  expect(location.path()).toEqual(path, expectationFailOutput || 'location.path()');
}

function expectElementOf(type: Type<any>): any {
  const el = fixture.debugElement.query(By.directive(type));
  expect(el).toBeTruthy('expected an element for ' + type.name);
  return el;
}

