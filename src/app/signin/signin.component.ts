/**
 *
 *  Component for login/signup pages. As the two only differ in a few lines of text we switch
 *	between the two by altering the content member of SigninComponent. This component sends
 *	the submitted account information to ServerCallsService, and if the server accepts it
 *	it sends the JWT to AuthService which routes us to the chat component.
 *
**/


import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../core/auth.service';
import { ServerCallsService } from '../core/server-calls.service';
import { SigninView, SigninViewDetails } from '../shared/models';


const VIEW_DETAILS = {
	[SigninView.login]: {
		header: 'User Login',
		otherView: SigninView.signup,
		submitMsg: 'Login',
		viewMsg: 'Need an account? Sign up here!'
	},
	[SigninView.signup]: {
		header: 'Signup',
		otherView: SigninView.login,
		submitMsg: 'Signup',
		viewMsg: 'Already have an account? Login'
	}
};


@Component({
	selector: 'app-signin',
	styleUrls: [ './signin.component.css' ],
	templateUrl: './signin.component.html'
})
export class SigninComponent {
	serverError: string = null;
	view: SigninView = SigninView.login;
	userForm: FormGroup;


	constructor(
		private authService: AuthService,
		private serverCalls: ServerCallsService
	) {
		this.userForm = new FormGroup({
			password: new FormControl('', Validators.required),
			username: new FormControl('', Validators.required)
		});

		this.userForm.valueChanges
			.subscribe(() => this.serverError = null);
	}


	get content(): SigninViewDetails {
		return VIEW_DETAILS[this.view];
	}


	handleSubmit(): void {
		this.serverCalls
			.postAccount(this.view, this.userForm.value)
			.subscribe(
				(JWT: string) => this.authService.setToken(
					this.userForm.value.username,
					JWT
				),
				(error: string) => {
					this.userForm.reset();
					this.serverError = error;
				}
			);
	}


	// Switch between login and signup pages
	switchView(): void {
		this.serverError = null;
		this.userForm.reset();
		this.view = this.content.otherView;
	}
}

