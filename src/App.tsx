import './App.css';
import { FC, useState, ChangeEvent } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import useMessage from './hooks/useMessage';
import { TASK, DEADLINE } from './utils/constants';
import Header from './components/Header';
import TodoInputs from './components/TodoInputs';
import TodoList from './components/TodoList';
import TodoListToggler from './components/TodoListToggler';
import Message from './components/Message';
import { ITask } from './types/Interfaces';

const App: FC = () => {
	const [task, setTask] = useState<string>('');
	const [deadline, setDeadline] = useState<Date>(new Date());
	const [todoList, setTodo] = useLocalStorage('todoList', []);
	const { message, showMessage } = useMessage();

	const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
		if (e.target.name === TASK) setTask(e.target.value);
		if (e.target.name === DEADLINE) setDeadline(new Date(e.target.value));
	};

	const addTask = (): void => {
		const newTask = {
			taskName: task,
			deadline: deadline,
		};

		if (!newTask.taskName) {
			showMessage('Add a description of the task.');
			return;
		}
		if (!newTask.deadline) {
			showMessage('Add a deadline of the task.');
			return;
		}

		setTodo([...todoList, newTask]);
		setTask('');
		setDeadline(new Date());
		showMessage('Task added successfuly!');
	};

	const completeTask = (keyValue: number): void => {
		setTodo(
			todoList.filter((task: ITask, index: number) => {
				return index !== keyValue;
			})
		);
		showMessage('Task removed.');
	};

	return (
		<div className='App'>
			<Header />

			<main className='todo'>
				<TodoInputs
					task={task}
					deadline={deadline}
					setDeadline={setDeadline}
					handleChange={handleChange}
					addTask={addTask}
				/>
				<TodoList todoList={todoList} completeTask={completeTask} />
				<TodoListToggler />
				<Message message={message} />
			</main>
		</div>
	);
};

export default App;
