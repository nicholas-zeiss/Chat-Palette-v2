

export enum SigninView {
	login = 'login',
	signup = 'signup'
}


export interface SigninViewDetails {
	header: string;
	otherView: SigninView;
	submitMsg: string;
	viewMsg: string;
}

