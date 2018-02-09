

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


	handleSubmit() {
		this.serverCalls.postAccount(this.view, this.userForm.value)
			.subscribe(
				(JWT) => this.authService.setToken(JWT),
				(serverError) => this.serverError = serverError
			);
	}


	switchView() {
		this.serverError = '';
		this.userForm.reset();
		this.view = this.content.otherView;
		this.content = CONTENT[this.view];
	}
}

