

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Color, COLOR_DETAILS } from './color.model';


@Component({
	selector: 'app-color-selector',
	templateUrl: './color-selector.component.html',
	styleUrls: ['./color-selector.component.css']
})
export class ColorSelectorComponent {
	COLORS = COLOR_DETAILS;
	@Input() currColor: Color;
	@Input() label: { bold: boolean, text: string };
	@Output() changeColor = new EventEmitter<Color>();


	getClassNames(color) {
		let className = color.value;

		if (color === this.currColor) {
			className += ' active';
		}

		return className;
	}
}

