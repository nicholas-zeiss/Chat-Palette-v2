/**
 *
 *	Used for guarding both the login/chat routes. These are accessible only when AuthService is
 *	logged in/not logged in respectively.
 *
**/


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

	constructor(
		private auth: AuthService,
		private router: Router
	) { }


	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): boolean {
			if (next.url[0].path === 'chat' && !this.auth.isLoggedIn) {
				this.router.navigate(['/login']);
				return false;

			} else if (next.url[0].path === 'login' && this.auth.isLoggedIn) {
				this.router.navigate(['/chat']);
				return false;
			}

		return true;
	}
}

