

import { Injectable } from '@angular/core';

import { PathingService } from './pathing.service';


@Injectable()
export class AuthService {

	private authenticated: boolean;
	username: string;

	constructor(private pathingService: PathingService) {
		this.authenticated = !!window.sessionStorage.getItem('token');
	}


	get isLoggedIn(): boolean {
		return this.authenticated;
	}


	get token(): string {
		return window.sessionStorage.getItem('token');
	}


	setToken(username: string, JWT: string): void {
		window.sessionStorage.setItem('token', JWT);
		this.username = username;
		this.authenticated = true;
		this.pathingService.pathToChat();
	}


	removeToken(): void {
		window.sessionStorage.clear();
		this.authenticated = false;
		this.pathingService.pathToLogin();
	}
}

