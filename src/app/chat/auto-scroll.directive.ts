

import { Directive, ElementRef, EventEmitter, Input, OnInit } from '@angular/core';

import * as $ from 'jquery';


@Directive({
	selector: '[appAutoScroll]'
})
export class AutoScrollDirective implements OnInit {

	@Input('appAutoScroll') scrollEvent: EventEmitter<any>;

	constructor(private el: ElementRef) { }


	ngOnInit() {
		const $container = $('#messages-container');

		this.scrollEvent.subscribe(() => {
			const messages = this.el.nativeElement.children;
			const bottom = messages[messages.length - 1];
			const scrollTo = bottom.offsetTop + bottom.offsetHeight;

			setTimeout(() => {
				$container.stop(true);		// cancel previous scrolls
				$container.animate({
					scrollTop: scrollTo
				}, 500);
			}, 0);
		});
	}
}

