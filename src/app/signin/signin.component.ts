

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { ServerCallsService } from '../api/server-calls.service';
import { User } from './user';


const CONTENT = {
	login: {
		header:  'User Login',
		otherView: 'signup',
		submitMsg: 'Login',
		viewMsg:  'Need an account? Sign up here!'
	},
	signup: {
		header:  'Signup',
		otherView: 'login',
		submitMsg: 'Signup',
		viewMsg:  'Already have an account? Login'
	}
};


@Component({
	selector: 'app-signin',
	styleUrls: [ './signin.component.css' ],
	templateUrl: './signin.component.html'
})
export class SigninComponent {

	content = CONTENT.login;
	errorMsg = '';
	user = new User();
	view = 'login';
	failure: (string) => void;
	success: (string) => void;


	constructor(
		private authService: AuthService,
		private router: Router,
		private serverCalls: ServerCallsService
	) {
		if (authService.isLoggedIn) {
			this.router.navigateByUrl('/chat', { skipLocationChange: true });
		}

		this.failure = (errorMsg: string) => { this.errorMsg = errorMsg; };

		this.success = (JWT: string) => {
			this.authService.setToken(JWT);
			this.router.navigateByUrl('/chat', { skipLocationChange: true });
		};
	}


	handleSubmit() {
		this.serverCalls[this.view](this.user.username, this.user.password)
			.subscribe(this.success, this.failure);
	}

	switchView() {
		this.errorMsg = '';
		this.user.reset();
		this.view = this.content.otherView;
		this.content = CONTENT[this.view];
	}
}

