

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';


const ERROR_MSGS = {
	400: 'That username is already in use',
	404: 'Invalid username/password',
	500: 'Server is unable to sign you up'
};


@Injectable()
export class ServerCallsService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
  	return this.http
  		.post<string>('/api/login', { username, password })
  		.pipe(catchError(this.sendAuthErrorMessage));
  }

  signup(username: string, password: string) {
  	return this.http
  		.post<string>('/api/signup', { username, password })
  		.pipe(catchError(this.sendAuthErrorMessage));
  }

  private sendAuthErrorMessage(err: HttpErrorResponse) {
  	return new ErrorObservable(ERROR_MSGS[err.status] || 'Unknown error');
  }
}

