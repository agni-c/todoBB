import { v4 as uuid } from 'uuid';

export interface TodoInterface {
	id: string;
	content: string;
	completed: boolean;
	archived: boolean;
	selected: boolean;
}

const todos: TodoInterface[] = [
	{
		id: uuid(),
		content: 'Finish homework',
		completed: false,
		archived: false,
		selected: false
	},
	{
		id: uuid(),
		content: 'Buy groceries',
		completed: true,
		archived: false,
		selected: false
	},
	{
		id: uuid(),
		content: 'Go for a run',
		completed: true,
		archived: true,
		selected: false
	},
	{
		id: uuid(),
		content: 'Call mom',
		completed: false,
		archived: false,
		selected: false
	}
];

export default todos;
