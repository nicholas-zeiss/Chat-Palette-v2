

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/auth.guard';


const routes: Routes = [
	{
		path: 'chat',
		canActivate: [AuthGuard],
		loadChildren: 'app/chat/chat.module#ChatModule'
	},
	{
		path: 'login',
		canActivate: [AuthGuard],
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

