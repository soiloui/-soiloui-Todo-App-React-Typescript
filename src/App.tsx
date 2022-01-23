import './App.css';
import { FC, useState, ChangeEvent } from 'react';
import { TASK, DEADLINE, MESSAGE_DURATION } from './constants';
import Header from './components/Header';
import TodoInputs from './components/TodoInputs';
import TodoList from './components/TodoList';
import TodoListToggler from './components/TodoListToggler';
import Message from './components/Message';
import useLocalStorage from './hooks/useLocalStorage';

const App: FC = () => {
	const [task, setTask] = useState<string>('');
	const [deadline, setDeadline] = useState<Date>(new Date());
	const [todoList, setTodo] = useLocalStorage('todoList', []);
	const [message, setMessage] = useState<string>('');
	const [messageTimeout, setMessageTimeout] = useState<number>();

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
			todoList.filter((task, index) => {
				return index !== keyValue;
			})
		);
		showMessage('Task removed.');
	};

	const showMessage = (message: string): void => {
		if (messageTimeout) clearTimeout(messageTimeout);

		setMessage(message);
		const activeClass = 'message--active';
		const messageElement = document.querySelector('.message');
		messageElement?.classList.add(activeClass);

		const newTimeout: number = window.setTimeout(() => {
			messageElement?.classList.remove(activeClass);
		}, MESSAGE_DURATION);

		setMessageTimeout(newTimeout);
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
