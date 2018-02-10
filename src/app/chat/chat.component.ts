

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ColorSelectorComponent } from './color-selector/color-selector.component';
import { Color, COLOR_DETAILS } from './color-selector/color.model';


@Component({
	selector: 'app-chat',
	styleUrls: ['./chat.component.css'],
	templateUrl: './chat.component.html'
})
export class ChatComponent {
	filterColor = COLOR_DETAILS[0];
	messageColor = COLOR_DETAILS[0];

	changeFilter(color) {
		this.filterColor = color;
	}
}

