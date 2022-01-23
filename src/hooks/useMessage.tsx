import { useState } from 'react';
import { MESSAGE_DURATION } from '../utils/constants';

const useMessage = () => {
	const [messageTimeout, setMessageTimeout] = useState<number>();
	const [message, setMessage] = useState<string>(() => {
		return '';
	});

	const showMessage = (message: string): void => {
		setMessage(message);

		if (messageTimeout) clearTimeout(messageTimeout);

		const activeClass = 'message--active';
		const messageElement = document.querySelector('.message');
		messageElement?.classList.add(activeClass);

		const newTimeout: number = window.setTimeout(() => {
			messageElement?.classList.remove(activeClass);
		}, MESSAGE_DURATION);
		setMessageTimeout(newTimeout);
	};

	return { message, showMessage } as const;
};

export default useMessage;
