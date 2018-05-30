

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { PathingService } from './pathing.service';
import { ServerCallsService } from './server-calls.service';
import { WebsocketService } from './websocket.service';


@NgModule({
	exports: [RouterModule],
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule
	],
	providers: [
		AuthGuard,
		AuthService,
		PathingService,
		ServerCallsService,
		WebsocketService
	]
})
export class CoreModule { }

