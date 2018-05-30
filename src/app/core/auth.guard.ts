/**
 *
 *	Used for guarding both the login/chat routes. These are accessible only when AuthService is
 *	logged in/not logged in respectively.
 *
**/


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';

import { AuthService } from './auth.service';
import { PathingService } from './pathing.service';


@Injectable()
export class AuthGuard implements CanActivate {

	constructor(
		private auth: AuthService,
		private pathingService: PathingService
	) { }


	canActivate(next: ActivatedRouteSnapshot): boolean {
		if (next.url[0].path === 'chat' && !this.auth.isLoggedIn) {
			this.pathingService.pathToLogin();
			return false;

		} else if (next.url[0].path === 'login' && this.auth.isLoggedIn) {
			this.pathingService.pathToChat();
			return false;
		}

		return true;
	}
}

