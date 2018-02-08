

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { SigninComponent } from './signin/signin.component';

import { AuthGuard } from './core/auth-guard.service';


const routes: Routes = [
	{
		path: 'chat',
		canActivate: [AuthGuard],
		component: ChatComponent
	},
	{
		path: 'login',
		loadChildren: 'app/signin/signin.module#SigninModule'
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

