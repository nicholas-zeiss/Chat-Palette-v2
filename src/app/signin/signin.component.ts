

import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SigninContent } from './signin-content';
import { SigninContentService } from './signin-content.service';
import { User } from '../user';


@Component({
	providers: [SigninContentService],
	selector: 'app-signin',
	styleUrls: [ './signin.component.css' ],
	templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {
	content: SigninContent;
	errorMsg: string;
	user: User;

	constructor(
		private contentService: SigninContentService,
		private router: Router
	) {
		this.content = contentService.getContent(router.url);
		this.errorMsg = null;
		this.user = new User('', '');
	}

	ngOnInit() {
	}
}

