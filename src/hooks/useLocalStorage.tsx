import { useState, useEffect } from 'react';
import { ITask } from '../types/Interfaces';

function getStorageValue(key: string, defaultValue: []) {
	if (typeof window !== 'undefined') {
		const savedItemsJSON = localStorage.getItem(key);

		if (savedItemsJSON) {
			const savedItems = JSON.parse(savedItemsJSON);
			savedItems.forEach((item: ITask) => {
				item.deadline = new Date(item.deadline);
			});
			return savedItems;
		}

		return defaultValue;
	}
}

const useLocalStorage = (key: string, defaultValue: []) => {
	const [value, setValue] = useState<ITask[]>(() => {
		return getStorageValue(key, defaultValue);
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue] as const;
};

export default useLocalStorage;
