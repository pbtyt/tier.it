import { useState } from 'react';

export function useForm<T>(initialValues: T) {
	const [values, setValues] = useState<T>(initialValues);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value, type } = e.target;
		setValues(prev => ({ ...prev, [name]: value }));
	};

	const setFieldValue = <K extends keyof T>(
		key: K,
		value: T[K] | ((prevValue: T[K]) => T[K]),
	) => {
		setValues(prev => ({
			...prev,
			[key]:
				typeof value === 'function'
					? (value as (prev: T[K]) => T[K])(prev[key])
					: value,
		}));
	};

	const reset = () => setValues(initialValues);

	return { values, handleChange, setFieldValue, reset };
}
