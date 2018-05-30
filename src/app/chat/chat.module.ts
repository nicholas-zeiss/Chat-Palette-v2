/**
 *
 *  Feature module for the chat component. Displays messages, allows user to filter by color,
 *	receives new messages from other users, and allows user to send their own messages.
 *
**/


import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ColorSelectorComponent } from './color-selector/color-selector.component';
import { NewMessageComponent } from './new-message/new-message.component';


@NgModule({
	declarations: [
		ColorSelectorComponent,
		ChatComponent,
		NewMessageComponent,
	],
	imports: [
		ChatRoutingModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	]
})
export class ChatModule { }

