

import { Injectable } from '@angular/core';


@Injectable()
export class SigninContentService {
	getContent(route) {
		if (route === '/login') {
			return {
				header:  'User Login',
				link:  '/signup',
				linkMsg:  'Need an account? Sign up here!'
			};
		} else {
			return {
				header:  'Signup',
				link:  '/login',
				linkMsg:  'Already have an account? Login'
			};
		}
	}
}

