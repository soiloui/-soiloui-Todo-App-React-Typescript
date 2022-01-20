import { ITask } from '../Interfaces';
import { MdDelete } from 'react-icons/md';

interface Props {
	task: ITask;
	completeTask(taskName: string, deadline: Date): void;
}

const getFormattedDate = (date: Date): string => {
	let year = date.getFullYear();
	let month = (1 + date.getMonth()).toString().padStart(2, '0');
	let day = date.getDate().toString().padStart(2, '0');

	return `${month}.${day}.${year}`;
};

const TodoTask = ({ task, completeTask }: Props) => {
	return (
		<div className='task'>
			<span className='task__name'>{task.taskName}</span>

			<div className='task__bottom'>
				<span className='task__deadline'>{getFormattedDate(task.deadline)}</span>
				<div
					className='task__close'
					onClick={() => {
						completeTask(task.taskName, task.deadline);
					}}
				>
					<MdDelete />
				</div>
			</div>
		</div>
	);
};

export default TodoTask;
