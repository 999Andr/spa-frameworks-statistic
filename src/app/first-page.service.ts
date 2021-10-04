import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class FirstPageService { 

	constructor(public router: Router) {}
	 
	isLocation = (w: Window): boolean => w.document.location.pathname == '/';
    doHistory = (w: Window): void | null =>  w.history.go(-1);
	
	set(w: Window): void {  
	    w.onpopstate = (): void | null => this.isLocation(w) ? this.doHistory(w) : null;
	    w.onbeforeunload = (): void => w.scrollTo(0, 0);
		w.document.location.pathname == '/charts' ? this.router.navigate(['']) : null; 
	}

}