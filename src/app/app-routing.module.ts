

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { SigninComponent } from './signin/signin.component';

import { AuthGuard } from './auth/auth-guard.service';


const routes: Routes = [
	{
		path: 'chat',
		canActivate: [AuthGuard],
		component: ChatComponent
	},
	{
		path: 'login',
		component: SigninComponent
	},
	{
		path: '**',
		redirectTo: '/login'
	}
];


@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}

