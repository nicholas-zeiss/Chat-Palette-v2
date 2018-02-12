

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ColorSelectorComponent } from './color-selector/color-selector.component';
import { NewMessageComponent } from './new-message/new-message.component';


@NgModule({
	imports: [
		ChatRoutingModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [
		ChatComponent,
		ColorSelectorComponent,
		NewMessageComponent
	]
})
export class ChatModule { }

