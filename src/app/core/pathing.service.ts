

import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class PathingService {
	constructor(private location: Location, private router: Router) { }

	pathToChat() {
		this.router.navigateByUrl('/chat', { skipLocationChange: true })
			.then(() => this.location.replaceState('/chat'));
	}

	pathToLogin() {
		this.router.navigateByUrl('/login', { skipLocationChange: true })
			.then(() => this.location.replaceState('/login'));
	}
}

