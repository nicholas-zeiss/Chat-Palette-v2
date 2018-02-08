

export class User {
	password: string;
	username: string;

	constructor() {
		this.password = '';
		this.username = '';
	}

	reset() {
		this.password = '';
		this.username = '';
	}
}

