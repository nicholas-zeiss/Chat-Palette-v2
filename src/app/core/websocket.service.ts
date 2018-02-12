

import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Message } from '../shared/message.model';
import { AuthService } from './auth.service';


@Injectable()
export class WebsocketService {

	destroy: () => void;
	private socket: any;

	constructor(private auth: AuthService) {
		this.destroy = () => {
			this.socket.disconnect();
			this.auth.removeToken();
		};
	}


	connect(): Subject<any> {
		this.socket = io('http://localhost:8080');


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

