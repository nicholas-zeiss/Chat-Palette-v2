/**
 *
 *	Model for a single message. Used in the chat feature module and the WebsocketService.
 *
**/


export interface Message {
	color: string;
	content: string;
	created_at?: Date;
	username: string;
}

