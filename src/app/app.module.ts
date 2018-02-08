

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { SigninComponent } from './signin/signin.component';


@NgModule({
	declarations: [
		AppComponent,
		ChatComponent,
		SigninComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		CoreModule,
		FormsModule
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

