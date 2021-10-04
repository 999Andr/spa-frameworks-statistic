import { Component } from '@angular/core';
import { ScrollService } from './shared/scroll.service';
import { FirstPageService } from './first-page.service';
type HandleEvents = (e: Event) => void;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  
  firstValue: boolean = true;
  title: string = 'frameworks';

  constructor(private firstPage: FirstPageService, public scrollService: ScrollService) {
    this.mainAppCompMethod(this.scrollService.window);
  }

  
  getChartsComponentByEvent(win: Window): void {
    win.onclick = this.handler(win);
    win.onscroll = this.handler(win);
  }
  
  handler(win: Window): HandleEvents { 
    
    return (e: Event): void => {
      win.onclick = null;
      win.onscroll = null;
                       
      this.firstPage.router.navigate(['charts']); 
      
      this.firstValue = false; 
    }
  }

  mainAppCompMethod(win: Window | null): void {
    
    if (win) {
        this.firstPage.set(win);
        this.firstValue == true ? this.getChartsComponentByEvent(win) : null
    }
  
  }

}