/**
 *
 *  Feature module for logging in/signing up. Handles submission of login/sign up details.
 *  If successful, AuthService (in core module) sets the session token and username onto the window's sessionStorage
 *  and routes us to the chat view. If unsuccessful, the controller removes the token should one already exist.
 *
**/


import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SigninRoutingModule } from './signin-routing.module';
import { SigninComponent } from './signin.component';


@NgModule({
	declarations: [SigninComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SigninRoutingModule
	]
})
export class SigninModule { }

