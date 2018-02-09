

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../core/auth.service';
import { PathingService } from '../core/pathing.service';
import { ServerCallsService } from '../core/server-calls.service';
import { CONTENT } from './signin-content';


@Component({
	selector: 'app-signin',
	styleUrls: [ './signin.component.css' ],
	templateUrl: './signin.component.html'
})
export class SigninComponent {

	content = CONTENT.login;
	serverError = '';
	view = 'login';
	userForm: FormGroup;
	failure: (string) => void;
	success: (string) => void;


	constructor(
		private authService: AuthService,
		private pathingService: PathingService,
		private serverCalls: ServerCallsService
	) {
		if (authService.isLoggedIn) {
			this.pathingService.pathToChat();
		}

		this.userForm = new FormGroup({
			username: new FormControl('', Validators.required ),
			password: new FormControl('', Validators.required )
		});

		this.userForm.valueChanges
			.subscribe(() => this.serverError = '');

		this.failure = (serverError) => {
			this.serverError = serverError;
		};

		this.success = (JWT) => {
			this.authService.setToken(JWT);
			this.pathingService.pathToChat();
		};
	}


	handleSubmit() {
		this.serverCalls[this.view](this.userForm.value)
			.subscribe(this.success, this.failure);
	}


	switchView() {
		this.serverError = '';
		this.userForm.reset();
		this.view = this.content.otherView;
		this.content = CONTENT[this.view];
	}
}

