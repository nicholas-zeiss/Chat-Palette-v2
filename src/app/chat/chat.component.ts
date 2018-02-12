

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ColorSelectorComponent } from './color-selector/color-selector.component';
import { Color, COLORS } from '../shared/color.model';
import { AuthService } from '../core/auth.service';
import { Message } from '../shared/message.model';
import { ServerCallsService } from '../core/server-calls.service';


@Component({
	selector: 'app-chat',
	styleUrls: ['./chat.component.css'],
	templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

	filterColor = COLORS[0];
	messageColor = COLORS[0];
	messages: Message[];
	username: string;


	constructor(
		private auth: AuthService,
		private serverCalls: ServerCallsService
	) { }


	ngOnInit() {
		this.username = this.auth.username;

		this.serverCalls
			.getMessages()
			.subscribe(
				(messages: Message[]) => {
					this.messages = messages;
					// connect to websocket
				},
				(error) => this.auth.removeToken()
			);
	}
}

