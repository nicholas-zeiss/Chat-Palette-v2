

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { ServerCallsService } from '../api/server-calls.service';
import { SigninContent, SigninContentService } from './signin-content.service';
import { User } from './user';


@Component({
	providers: [SigninContentService],
	selector: 'app-signin',
	styleUrls: [ './signin.component.css' ],
	templateUrl: './signin.component.html'
})
export class SigninComponent {

	errorMsg = '';
	user = new User();
	content: SigninContent;
	failure: (string) => void;
	success: (string) => void;


	constructor(
		private authService: AuthService,
		private contentService: SigninContentService,
		private router: Router,
		private serverCalls: ServerCallsService
	) {
		if (authService.isLoggedIn) {
			this.router.navigate(['/chat']);
		}

		this.content = contentService.getContent(router.url);

		this.failure = (errorMsg: string) => { this.errorMsg = errorMsg; };

		this.success = (JWT: string) => {
			this.authService.setToken(JWT);
			this.router.navigate(['/chat']);
		};
	}


	handleSubmit() {
		if (this.router.url === '/login') {
			this.serverCalls
				.login(this.user.username, this.user.password)
				.subscribe(this.success, this.failure);

		} else {
			this.serverCalls
				.signup(this.user.username, this.user.password)
				.subscribe(this.success, this.failure);
		}
	}
}

