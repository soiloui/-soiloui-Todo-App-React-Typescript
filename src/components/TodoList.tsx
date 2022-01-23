import TodoTask from '../components/TodoTask';
import { ITask } from '../Interfaces';

interface Props {
	todoList: ITask[];
	completeTask(keyValue: number): void;
}

const TodoList = ({ todoList, completeTask }: Props) => {
	return (
		<div className='todo__list'>
			<div className='width-wrapper'>
				{todoList.map((task: ITask, key: number) => {
					return (
						<TodoTask task={task} key={key} keyValue={key} completeTask={completeTask} />
					);
				})}
			</div>
		</div>
	);
};

export default TodoList;
