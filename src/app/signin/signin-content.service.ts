

import { Injectable } from '@angular/core';


export interface SigninContent {
	header: string;
	link: string;
	linkMsg: string;
	submitMsg: string;
}


@Injectable()
export class SigninContentService {
	getContent(route) {
		if (route === '/login') {
			return {
				header:  'User Login',
				link:  '/signup',
				linkMsg:  'Need an account? Sign up here!',
				submitMsg: 'Login'
			};
		} else {
			return {
				header:  'Signup',
				link:  '/login',
				linkMsg:  'Already have an account? Login',
				submitMsg: 'Signup'
			};
		}
	}
}

