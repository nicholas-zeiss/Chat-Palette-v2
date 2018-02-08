

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { SigninComponent } from './signin/signin.component';

import { ServerCallsService } from './api/server-calls.service';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';


@NgModule({
	declarations: [
		AppComponent,
		ChatComponent,
		SigninComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		FormsModule,
		HttpClientModule
	],
	providers: [
		AuthGuard,
		AuthService,
		ServerCallsService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

