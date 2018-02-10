

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ColorSelectorComponent } from './color-selector/color-selector.component';


@NgModule({
	imports: [
		ChatRoutingModule,
		CommonModule,
		FormsModule
	],
	declarations: [
		ChatComponent,
		ColorSelectorComponent
	]
})
export class ChatModule { }

