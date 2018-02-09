

import { Injectable } from '@angular/core';

import { PathingService } from './pathing.service';


@Injectable()
export class AuthService {
	private authenticated: boolean;

	constructor(private pathingService: PathingService) {
		this.authenticated = !!window.sessionStorage.getItem('token');
	}

	get isLoggedIn() {
		return this.authenticated;
	}

	setToken(JWT: string) {
		window.sessionStorage.setItem('token', JWT);
		this.authenticated = true;
		this.pathingService.pathToChat();
	}

	removeToken() {
		window.sessionStorage.clear();
		this.authenticated = false;
		this.pathingService.pathToLogin();
	}
}

