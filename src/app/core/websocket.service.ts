/**
 *
 *	Service to interact with our Socket.io socket. Handles JWT authentication, message listening, and message emitting.
 *
**/


import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as io from 'socket.io-client';

import { environment } from '../../environments/environment';
import { Message } from '../shared/message.model';
import { AuthService } from './auth.service';


@Injectable()
export class WebsocketService {
	private socket: any;
	destroy: () => void;


	constructor(private auth: AuthService) {
		this.destroy = () => {
			this.socket.disconnect();
			this.auth.removeToken();
		};
	}


	connect(): Subject<any> {
		this.socket = io(environment.ws);

		const observable = new Observable(subscriber => {
			this.socket
				.emit('authenticate', { token: this.auth.token })
				.on('authenticated', () => {
					this.socket.on('message', (msg: Message) => {
						subscriber.next(msg);
					});
				})
				.on('unauthorized', () => {
					subscriber.error('Socket rejected token');
					this.destroy();
				});

			return this.destroy;
		});


		const observer = {
			next: (msg: Message) => {
				this.socket.emit('message', Object.assign({}, msg));
			}
		};


		return Subject.create(observer, observable);
	}
}

