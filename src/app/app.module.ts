

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';


@NgModule({
	declarations: [
		AppComponent,
		ChatComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		CoreModule,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

