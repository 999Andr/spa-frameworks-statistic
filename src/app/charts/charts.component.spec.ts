import { Component, Input } from '@angular/core';
import { ChartsComponent } from './charts.component';
import { fakeAsync, ComponentFixture, tick, TestBed } from '@angular/core/testing';
import { CheckService } from '../shared/check.service';
import { ChartsModule } from './charts.module';
import { ChartsRoutingModule } from './charts-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './charts-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ScrollService } from '../shared/scroll.service';

let comp: ChartsComponent;
let fixture: ComponentFixture<ChartsComponent>;
let scrollService: ScrollService;

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

describe('ChartsComponent', () => {
  
  class MockCheckService {
    constructor(public nativeWindow: Window | null) {}
  }

  it('class should work on the server', () => {
    TestBed.configureTestingModule({
    
      providers: [
        ChartsComponent,
        { provide: ScrollService,  
          useFactory: () => new ScrollService(
            new MockCheckService(null) as unknown as CheckService),
          deps: [] 
        }
      ]
    }) ;
  
    comp = TestBed.inject(ChartsComponent);
    
    expect(comp).toBeTruthy();
    comp.ngOnInit();
  });

  it('class should work on the browser', () => {
    TestBed.configureTestingModule({
    
      providers: [
        ChartsComponent,
        { provide: ScrollService,  
          useFactory: () => new ScrollService(
            new MockCheckService(window) as unknown as CheckService),
          deps: [] 
        }
      ]
    }) ;
  
    comp = TestBed.inject(ChartsComponent);
    
    expect(comp).toBeTruthy();
    comp.ngOnInit();
  });
});

describe('ChartsComponent & ChartsModule', () => {
  
  beforeEach(fakeAsync(() => {
    TestBed
        .configureTestingModule({ imports: [ChartsModule, RouterTestingModule.withRoutes(routes),], })
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
              fixture = TestBed.createComponent(ChartsComponent);
              
              comp = fixture.componentInstance;
              const injector = fixture.debugElement.injector;
              scrollService = injector.get(ScrollService);
              fixture.detectChanges();
              tick();
          
      }) 
          
  }));

  it('class methods should work', fakeAsync(() => {

    expect(comp).not.toBeNull();
    
    comp.ngOnInit();
    window.dispatchEvent(new Event('resize'));

  }));

})
