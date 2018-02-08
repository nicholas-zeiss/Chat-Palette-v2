

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
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
		ServerCallsService
	]
})
export class CoreModule { }

