/**
 *
 *  A directive that is attached to the container of the message elements in the chat view
 *  that causes it to scroll down to display the latest message when a scroll event is
 *	emitted. jQuery's animate method is used to implement a smooth scroll.
 *
**/


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

