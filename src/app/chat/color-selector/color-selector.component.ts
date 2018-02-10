

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Color, COLOR_DETAILS } from './color.model';


@Component({
	selector: 'app-color-selector',
	templateUrl: './color-selector.component.html',
	styleUrls: ['./color-selector.component.css']
})
export class ColorSelectorComponent implements OnInit {
	COLORS = COLOR_DETAILS;
	@Input() currColor: Color;
	@Input() label: string;
	@Output() changeColor = new EventEmitter<Color>();


	ngOnInit() {
		// console.log(this.currColor);
	}


	getClassNames(color) {
		let classes = color.value + '-button';

		if (color === this.currColor) {
			classes += ' active';
		}

		return classes;
	}


	selectColor(color: Color) {
		console.log(color);
	}
}

