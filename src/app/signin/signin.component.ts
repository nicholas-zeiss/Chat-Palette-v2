

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../core/auth.service';
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


	constructor(
		private authService: AuthService,
		private serverCalls: ServerCallsService
	) {
		this.userForm = new FormGroup({
			username: new FormControl('', Validators.required ),
			password: new FormControl('', Validators.required )
		});

		this.userForm.valueChanges
			.subscribe(() => this.serverError = '');
	}


	handleSubmit(): void {
		this.serverCalls
			.postAccount(this.view, this.userForm.value)
			.subscribe(
				(JWT: string) => this.authService.setToken(
					this.userForm.value.username,
					JWT
				),
				(serverError: string) => {
					this.userForm.reset();
					this.serverError = serverError;
				}
			);
	}


	switchView(): void {
		this.serverError = '';
		this.userForm.reset();
		this.view = this.content.otherView;
		this.content = CONTENT[this.view];
	}
}

