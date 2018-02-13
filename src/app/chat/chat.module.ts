

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ColorSelectorComponent } from './color-selector/color-selector.component';
import { NewMessageComponent } from './new-message/new-message.component';
import { AutoScrollDirective } from './auto-scroll.directive';


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
		NewMessageComponent,
		AutoScrollDirective
	]
})
export class ChatModule { }

