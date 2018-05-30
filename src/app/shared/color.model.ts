/**
 *
 *	Model for the various colors a message can possess. Used in the chat feature and the Message model.
 *
**/


export interface Color {
	btnLabel: string;
	displayLabel: string;
	className: string;
}


export const COLORS: Color[] = [
	{
		btnLabel: 'All',
		className: 'clear',
		displayLabel: 'all'
	},
	{
		btnLabel: 'R',
		className: 'red',
		displayLabel: 'red'
	},
	{
		btnLabel: 'G',
		className: 'green',
		displayLabel: 'green'
	},
	{
		btnLabel: 'B',
		className: 'blue',
		displayLabel: 'blue'
	},
	{
		btnLabel: 'Y',
		className: 'yellow',
		displayLabel: 'yellow'
	}
];

