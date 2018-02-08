

import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
	private authenticated: boolean;

	constructor() {
		this.authenticated = !!window.sessionStorage.getItem('token');
	}

	get isLoggedIn() {
		return this.authenticated;
	}

	setToken(JWT: string) {
		window.sessionStorage.setItem('token', JWT);
		this.authenticated = true;
	}

	verifyToken() {

	}

	removeToken() {
		window.sessionStorage.clear();
		this.authenticated = false;
	}
}

