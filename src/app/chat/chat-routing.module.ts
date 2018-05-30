

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatComponent } from './chat.component';


const routes: Routes = [
	{
		component: ChatComponent,
		path: ''
	}
];


@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(routes)]
})
export class ChatRoutingModule { }

