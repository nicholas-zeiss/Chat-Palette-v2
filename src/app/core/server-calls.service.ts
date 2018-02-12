

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';
import { User } from '../shared/user.model';


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


	postAccount(route: string, user: User): Observable<any> {
		return this.http
			.post<string>('/api/' + route, user)
			.pipe(catchError((error) => {
				const msg = ERROR_MSGS[error.status] || 'Unknown error';
				return new ErrorObservable(msg);
			}));
	}
}

