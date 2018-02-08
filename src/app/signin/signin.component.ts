

import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

	content: SigninContent;
	errorMsg: string;
	failure: (string) => void;
	success: (string) => void;
	tokenEmitter: EventEmitter<string>;
	user: User;


	constructor(
		private contentService: SigninContentService,
		private router: Router,
		private serverCalls: ServerCallsService
	) {
		this.content = contentService.getContent(router.url);
		this.errorMsg = null;
		this.tokenEmitter = new EventEmitter<string>();
		this.user = new User();

		this.failure = (errorMsg: string) => { this.errorMsg = errorMsg; };

		this.success = (JWT: string) => {
			this.errorMsg = null;
			this.tokenEmitter.emit(JWT);
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

