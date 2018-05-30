

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './signin.component';


const routes: Routes = [
	{
		component: SigninComponent,
		path: ''
	}
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(routes)]
})
export class SigninRoutingModule { }

