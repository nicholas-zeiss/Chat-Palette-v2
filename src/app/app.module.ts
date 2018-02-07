

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { SigninComponent } from './signin/signin.component';

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
		FormsModule
	],
	providers: [
		AuthGuard,
		AuthService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

