import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: 'root'
})


export class CheckService { 
  
  nativeWindow: Window | null;
  
  constructor( @Inject(PLATFORM_ID) platformId: Object) { 
    this.nativeWindow = isPlatformBrowser(platformId) ? window : null
  }


}
