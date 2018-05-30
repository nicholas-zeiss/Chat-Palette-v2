/**
 *
 *	Sets up lazy loading of our two views, signup and chat.
 *
**/


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/auth.guard';


const routes: Routes = [
	{
		canActivate: [AuthGuard],
		loadChildren: 'app/chat/chat.module#ChatModule',
		path: 'chat'
	},
	{
		canActivate: [AuthGuard],
		loadChildren: 'app/signin/signin.module#SigninModule',
		path: 'login'
	},
	{
		path: '**',
		redirectTo: '/login'
	}
];


@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}

