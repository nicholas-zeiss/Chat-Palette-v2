/**
 *
 *	Service for HTTP requests to the server. Handles login/signup and collection of extant messages when loading
 *	the chat component.
 *
**/


import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';

import { SigninView } from '../shared/models';
import { User } from '../shared/user.model';
import { AuthService } from './auth.service';


const ERROR_MSGS = {
	400: 'That username is already in use',
	404: 'Invalid username/password',
	500: 'Server is unable to sign you up'
};


@Injectable()
export class ServerCallsService {

	constructor(
		private auth: AuthService,
		private http: HttpClient
	) { }


	getMessages(): Observable<any> {
		if (!this.auth.isLoggedIn) {
			return null;
		}

		return this.http.get(
				'/api/messages',
				{ headers: { Authorization: 'Bearer ' + this.auth.token }}
			)
			.pipe(catchError((error) => new ErrorObservable(null)));
	}


	postAccount(route: SigninView, user: User): Observable<string> {
		return this.http
			.post<string>('/api/' + route, user)
			.pipe(catchError((err: HttpErrorResponse): Observable<string> => (
				new ErrorObservable(ERROR_MSGS[err.status] || 'Unknown error')
			)));
	}
}

