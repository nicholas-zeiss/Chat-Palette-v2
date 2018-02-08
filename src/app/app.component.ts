

import { Component } from '@angular/core';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'Chat Palette';

	setToken(token: string) {
		console.log('app.component received token: ' + token);
	}
}

