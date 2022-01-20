import { BiPlus } from 'react-icons/bi';
import DatePicker from 'react-date-picker';
import { TASK, DEADLINE } from '../constants';
import { ChangeEvent } from 'react';

interface Props {
	task: string;
	deadline: Date;
	setDeadline: React.Dispatch<React.SetStateAction<Date>>;
	handleChange(e: ChangeEvent<HTMLInputElement>): void;
	addTask(): void;
}

const TodoInputs = ({ task, deadline, setDeadline, addTask, handleChange }: Props) => {
	return (
		<div className='width-wrapper'>
			<div className='todo__inputs'>
				<input
					type='text'
					placeholder='Task..'
					name={TASK}
					value={task}
					onChange={handleChange}
					onKeyPress={(e) => {
						if (e.key === 'Enter') addTask();
					}}
				/>

				<div className='second-row'>
					<DatePicker
						name={DEADLINE}
						value={deadline}
						onChange={setDeadline}
						clearIcon={null}
					/>
					<button className='submit' onClick={addTask}>
						<BiPlus />
					</button>
				</div>
			</div>
		</div>
	);
};

export default TodoInputs;
