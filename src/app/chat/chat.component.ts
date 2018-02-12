

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ColorSelectorComponent } from './color-selector/color-selector.component';
import { Color, COLOR_DETAILS } from './color-selector/color.model';
import { AuthService } from '../core/auth.service';
import { ServerCallsService } from '../core/server-calls.service';
import { Message } from './message.model';


@Component({
	selector: 'app-chat',
	styleUrls: ['./chat.component.css'],
	templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

	filterColor = COLOR_DETAILS[0];
	messageColor = COLOR_DETAILS[0];
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

