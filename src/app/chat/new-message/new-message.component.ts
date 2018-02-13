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
	templateUrl: './new-message.component.html',
	styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent {

	messageForm: FormControl;
	@Input() color: Color;
	@Input() username: string;
	@Output() newMessage = new EventEmitter<Message>();

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

