import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';

@NgModule({
  declarations: [
    ChartsComponent
  ],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    NgxChartsModule
  ]
})
export class ChartsModule { }
