import { Injectable } from '@angular/core';
import { CheckService } from './check.service';
@Injectable({
  providedIn: 'root'
})

export class ScrollService { 
  
  window: Window | null;
  
  constructor(private checkService: CheckService) { 
      this.window = checkService.nativeWindow;
  }

  getInnerWidth = (w: Window): number => w.innerWidth ;
  getElClWidth = (w: Window): number => w.document.documentElement.clientWidth;
  getBodyClWidth = (w: Window): number => w.document.body.clientWidth;
  
  getViewportWidth = (w: Window): number =>
    ( this.getInnerWidth(w) || this.getElClWidth(w) || this.getBodyClWidth(w) );
  
  getView(): number[] {   
    const w: Window = <Window>this.window;
    let x: number = this.getViewportWidth(w);
    
    if (x > 1170) {
      x = 459;
    } else if ((x > 1017) && (x <= 1170)) {
      x = 0.45 * x;
    } else if ((x > 780) && (x <= 1117)) {
      x = 0.41 * x;
    } else if ((x > 594) && (x <= 780)) {
      x = 0.36 * x;
    } else {
      x = 0.9 * x;
    };
    
    return [x, 300];
  }
  
  getElement = (arg: string): HTMLElement => 
    (<Window>this.window).document.getElementById(arg) as HTMLElement;

  getRangers = (): void => { 
    const w: Window = <Window>this.window;
    this.getElement('showImg').style.background = 
      'url(/assets/rangers.jpg) no-repeat center top/ cover';
    this.getElement('bodyElement').style.background = '#051e34';
    
    const showImg = (): void => {
      this.getElement('bodyBox').style.opacity = '0';
      this.getElement('bodyBox').style.transition = 'all .45s ease-in';
    };
    
    const hideImg = (): void => { 
      this.getElement('fB').style.borderTop = '1px solid #6c757d';
      this.getElement('compScreen').style.visibility = 'visible';
      this.getElement('showImg').style.background = 'transparent';
      this.getElement('bodyBox').style.opacity = '1';
      w.onscroll = null;
      this.getElement('bodyBox').style.transition = 'all .45s ease-in';
      this.getElement('bodyBox').style.zIndex = '99';
      w.scrollTo(0, 0); 
    };
    let timerId: number;
    
    Promise.resolve(showImg())
      .then(() => { 
        timerId = w.setTimeout(() => {
          hideImg();
          w.clearTimeout(timerId);
        }
        , 1800)
      })
  } 

  isNotStop = (w: Window): boolean => w.pageYOffset > 0 ;

  goToArrowShow(): void {
    const w: Window = <Window>this.window;
    w.scrollTo(0, (w.pageYOffset + 9));
    let timerId: number;
    timerId = w.setTimeout(() => {
      w.onscroll = null;    
      w.scrollTo(0, 999999999);
      w.clearTimeout(timerId);
    }, 459);

    w.onscroll = (): void => 
      w.scrollTo(0, w.pageYOffset + 99);    
  }
  
  goTop(): void {
    const w: Window = <Window>this.window;
    w.scrollTo(0, w.pageYOffset - 99);
    
    this.getElement('fB').style.borderTop = 'none';
    this.getElement('bodyBox').style.zIndex = '0';
    this.getElement('compScreen').style.visibility = 'hidden';  
    this.getRangers();
      
    w.onscroll = (): void => {
        
      if (this.isNotStop(w)) {
        w.scrollTo(0, w.pageYOffset - 99);
      } else {
        w.onscroll = null;
        this.getElement('bodyBox').style.zIndex = '99';
        return;
      }
    }
  }

}