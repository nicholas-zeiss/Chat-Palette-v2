

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth.service';
import { ServerCallsService } from '../core/server-calls.service';
import { CONTENT } from './signin-content'
import { User } from './user.model';


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
			this.router.navigateByUrl('/chat');
		}
		console.log('signin constructor')
		this.failure = (errorMsg: string) => { this.errorMsg = errorMsg; };

		this.success = (JWT: string) => {
			this.authService.setToken(JWT);
			this.router.navigateByUrl('/chat');
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

