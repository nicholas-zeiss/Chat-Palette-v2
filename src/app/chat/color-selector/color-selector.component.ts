/**
 *
 *  Component for the color selector buttons used to filter messages/choose the
 *	color of a new message.
 *
**/


import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Color, COLORS } from '../../shared/color.model';


@Component({
	selector: 'app-color-selector',
	templateUrl: './color-selector.component.html',
	styleUrls: ['./color-selector.component.css']
})
export class ColorSelectorComponent {

	COLORS = COLORS;
	@Input() currColor: Color;
	@Input() label: { bold: boolean, text: string };
	@Output() changeColor = new EventEmitter<Color>();


	getClassNames(color) {
		let { className } = color;

		if (color === this.currColor) {
			className += ' active';
		}

		return className;
	}
}

