

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { ColorSelectorComponent } from './color-selector/color-selector.component';
import { Color, COLORS } from '../shared/color.model';
import { AuthService } from '../core/auth.service';
import { Message } from '../shared/message.model';
import { ServerCallsService } from '../core/server-calls.service';
import { WebsocketService } from '../core/websocket.service';


@Component({
	selector: 'app-chat',
	styleUrls: ['./chat.component.css'],
	templateUrl: './chat.component.html'
})
export class ChatComponent implements OnDestroy, OnInit {

	filterColor = COLORS[0];
	messageColor = COLORS[0];
	messages: Message[];
	messageListener: Subscription;
	username: string;
	websocket: Subject<any>;

	constructor(
		private auth: AuthService,
		private serverCalls: ServerCallsService,
		private wsService: WebsocketService
	) { }


	ngOnInit(): void {
		this.username = this.auth.username;

		this.serverCalls
			.getMessages()
			.subscribe(
				(messages: Message[]) => {
					this.messages = messages;
					this.connectSocket();
				},
				(error) => this.auth.removeToken()
			);
	}


	connectSocket(): void {
		this.websocket = this.wsService.connect();

		this.messageListener = this.websocket
			.subscribe((msg: Message) => {
				console.log(msg);
			});
	}


	emitMessage(): void {
		this.websocket.next({
			color: 'red',
			content: 'foobar',
			username: 'test'
		});
	}


	logout(): void {
		this.auth.removeToken();
	}


	ngOnDestroy(): void {
		if (this.messageListener !== undefined) {
			this.messageListener.unsubscribe();
		}
	}
}

