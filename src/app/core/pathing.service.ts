

import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class PathingService {

	constructor(private location: Location, private router: Router) { }


	pathToChat(): void {
		if (this.router.url !== '/chat') {
			this.router
				.navigateByUrl('/chat', { skipLocationChange: true })
				.then(() => this.location.replaceState('/chat'));
		}
	}


	pathToLogin(): void {
		if (this.router.url !== '/login') {
			this.router
				.navigateByUrl('/login', { skipLocationChange: true })
				.then(() => this.location.replaceState('/login'));
		}
	}
}

