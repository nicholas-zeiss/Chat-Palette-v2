/**
 *
 *  Top level component of the chat view. It coordinates interaction with ServerCallsService (to load extant
 *	messages on initialization), AuthService to logout, and WebsocketService to receive/create new messages.
 *
 *	It also handles filtering displayed messages by color and setting the color of messages to be posted by the user
 *  using two ColorSelectorComponents. The form for a new message is implemented with a NewMessageComponent.
 *
 *	The message elements are accessed via ViewChildren so that when a new message is received it is scrolled into view.
 *
**/




import { AfterViewInit, Component, OnDestroy, QueryList, ViewChildren } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../core/auth.service';
import { ServerCallsService } from '../core/server-calls.service';
import { WebsocketService } from '../core/websocket.service';
import { Color, COLORS } from '../shared/color.model';
import { Message } from '../shared/message.model';


@Component({
	selector: 'app-chat',
	styleUrls: ['./chat.component.css'],
	templateUrl: './chat.component.html'
})
export class ChatComponent implements AfterViewInit, OnDestroy {
	@ViewChildren('msg') messageList: QueryList<any>;

	filterColor = COLORS[0];
	messageColor = COLORS[0];
	messages: Message[];
	messageListener: Subscription;
	socketListener: Subscription;
	username: string;
	websocket: Subject<any>;

	constructor(
		private auth: AuthService,
		private serverCalls: ServerCallsService,
		private wsService: WebsocketService
	) {
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


	ngAfterViewInit(): void {
		this.messageListener = this.messageList.changes
			.subscribe(list => {
				setTimeout(() => list.last.nativeElement.scrollIntoView({
					behavior: 'smooth',
					block: 'center'
				}), 100);
			});
	}


	isVisible(message: Message) {
		return this.filterColor.displayLabel === 'all'
			|| this.filterColor.className === message.color;
	}


	connectSocket(): void {
		this.websocket = this.wsService.connect();

		this.socketListener = this.websocket
			.subscribe((message: Message) => {
				this.messages.push(message);
			});
	}


	emitMessage(message: Message): void {
		this.websocket.next(message);
	}


	logout(): void {
		this.auth.removeToken();
	}


	ngOnDestroy(): void {
		this.messageListener.unsubscribe();

		if (this.socketListener !== undefined) {
			this.socketListener.unsubscribe();
		}
	}
}

