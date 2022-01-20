import { MouseEvent } from 'react';
import { BsListTask } from 'react-icons/bs';

const activateList = (e: MouseEvent<HTMLDivElement>) => {
	const taskList = document.querySelector('.todo__list');
	taskList!.classList.toggle('todo__list--active');
	e.currentTarget!.classList.toggle('active');
};

const TodoListToggler = () => {
	return (
		<div className='list-toggler' onClick={activateList}>
			<BsListTask />
		</div>
	);
};

export default TodoListToggler;
