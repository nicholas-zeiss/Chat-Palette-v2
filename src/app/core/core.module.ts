

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { PathingService } from './pathing.service';
import { ServerCallsService } from './server-calls.service';


@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule
	],
	exports: [RouterModule],
	providers: [
		AuthGuard,
		AuthService,
		PathingService,
		ServerCallsService,
	]
})
export class CoreModule { }

