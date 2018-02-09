

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';


const ERROR_MSGS = {
	400: 'That username is already in use',
	404: 'Invalid username/password',
	500: 'Server is unable to sign you up'
};


@Injectable()
export class ServerCallsService {

	constructor(private http: HttpClient) { }

	postAccount(route, { username, password }) {
		return this.http
			.post<string>('/api/' + route, { username, password })
			.pipe(
				catchError((error) => {
					const msg = ERROR_MSGS[error.status] || 'Unknown error';
					return new ErrorObservable(msg);
				})
			);
	}
}

