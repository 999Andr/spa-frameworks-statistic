import { Component, OnInit } from '@angular/core';
import { Multi, Single } from '../shared/interfaces';
import { ScrollService } from '../shared/scroll.service';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  
  colorScheme: any = {
    domain: ['#90EE90', '#87CEFA', '#FF7F50']
  };
  colorSchemeTwo: any = {
    domain: ['#3cb371', '#f0fff0', '#5AA454', '#9370DB']
  };
  gradient: boolean = false;
  isDoughnut: boolean = false;
  legendPosition: any = 'left';
  multi: Multi[] = [
    {
      "name": "Vue",
      "series": [
        {
          "name": "2019",
          "value": 157000
        },
        {
          "name": "2018",
          "value": 122284
        }
      ]
    },

    {
      "name": "React",
      "series": [
        {
          "name": "2019",
          "value": 144000
        },
        {
          "name": "2018",
          "value": 117687
        }
      ]
    },

    {
      "name": "Angular",
      "series": [
        {
          "name": "2019",
          "value": 57600
        },
        {
          "name": "2018",
          "value": 43546
        }
      ]
    }
  ];
  showLabels: boolean = true;
  showLegend: boolean = true;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  single: Single[] = [
 
    {
      "name": "Vue",
      "value": 157000
    },
    {
      "name": "React",
      "value": 144000
    },
    {
      "name": "Angular",
      "value": 57600
    }
  ];
  singleTwo: Single[] = [
 
    {
      "name": "Vue",
      "value": 11590
    },
    {
      "name": "React",
      "value": 70963
    },
    {
      "name": "Angular",
      "value": 72742
    }
  ];
  singleThird: Single[] = [
 
    {
      "name": "Vue",
      "value": 188000
    },
    {
      "name": "React",
      "value": 174000
    },
    {
      "name": "Angular",
      "value": 76300
    }
  ];
  singleFour: Single[] = [
 
    {
      "name": "Vue",
      "value": 79800
    },
    {
      "name": "React",
      "value": 123300
    },
    {
      "name": "Angular",
      "value": 102000
    }
  ];
  timeline: boolean = true;
  title: string = 'frameworks';
  view!: any;
  xAxisLabel: string = 'Framework';
  yAxisLabel: string = 'Numbers';
  
  constructor(public scrollService: ScrollService) {}

  ngOnInit(): void {  
    
    if (this.scrollService.window) {  
      this.view = this.scrollService.getView();
      this.scrollService.window.onresize = (): number[] => 
        this.view = this.scrollService.getView();
    }  
  }
}