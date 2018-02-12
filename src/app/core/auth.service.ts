

import { Injectable } from '@angular/core';

import { PathingService } from './pathing.service';


@Injectable()
export class AuthService {

	private authenticated: boolean;

	constructor(private pathingService: PathingService) {
		this.authenticated = !!window.sessionStorage.getItem('token');
	}


	get isLoggedIn(): boolean {
		return this.authenticated;
	}


	get token(): string {
		return window.sessionStorage.getItem('token');
	}


	get username(): string {
		return window.sessionStorage.getItem('username');
	}


	setToken(username: string, JWT: string): void {
		window.sessionStorage.setItem('username', username);
		window.sessionStorage.setItem('token', JWT);
		this.authenticated = true;
		this.pathingService.pathToChat();
	}


	removeToken(): void {
		window.sessionStorage.clear();
		this.authenticated = false;
		this.pathingService.pathToLogin();
	}
}

