import { TestBed, inject } from '@angular/core/testing';

import { SigninContentService } from './signin-content.service';

describe('SigninContentService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [SigninContentService]
		});
	});

	it('should be created', inject([SigninContentService], (service: SigninContentService) => {
		expect(service).toBeTruthy();
	}));
});
