/**
 *
 *  Component for the new message form.
 *
**/


import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Color } from '../../shared/color.model';
import { Message } from '../../shared/message.model';


@Component({
	selector: 'app-new-message',
	styleUrls: ['./new-message.component.css'],
	templateUrl: './new-message.component.html'
})
export class NewMessageComponent {
	@Input() color: Color;
	@Output() newMessage = new EventEmitter<Message>();
	@Input() username: string;

	messageForm: FormControl;

	constructor() {
		this.messageForm = new FormControl('', [
			Validators.required,
			Validators.maxLength(120)
		]);
	}


	submitMessage() {
		this.newMessage.emit({
			color: this.color.className,
			content: this.messageForm.value,
			username: this.username
		});

		this.messageForm.reset();
	}
}

