import axios, { AxiosError } from 'axios';
import { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import { ErrorResponse } from '../model/types';

interface HandleErrorOptions<T extends FieldValues> {
	setError: UseFormSetError<T>;
	fieldMap?: Partial<Record<string, Path<T>>>;
}

export function handleAuthError<T extends FieldValues>(
	error: unknown,
	{ setError, fieldMap }: HandleErrorOptions<T>,
) {
	if (!axios.isAxiosError<ErrorResponse>(error)) {
		setError('root' as Path<T>, {
			type: 'unknown',
			message: 'Произошла неизвестная ошибка',
		});
		return;
	}

	const axiosError = error as AxiosError<ErrorResponse>;

	if (!axiosError.response) {
		setError('root' as Path<T>, {
			type: 'network',
			message: 'Не удалось подключиться к серверу',
		});
		return;
	}

	const { statusCode, message } = axiosError.response.data;

	const textMessage = Array.isArray(message) ? message.join('. ') : message;

	switch (statusCode) {
		case 401:
			setError('password' as Path<T>, {
				type: 'server',
				message: 'Неверный email или пароль',
			});
			break;

		case 404:
			setError('email' as Path<T>, {
				type: 'server',
				message: 'Пользователь с таким email не найден',
			});
			break;

		case 400:
		case 422:
			setError('root' as Path<T>, {
				type: 'validation',
				message: textMessage,
			});
			break;

		case 429:
			setError('root' as Path<T>, {
				type: 'rate-limit',
				message: 'Слишком много попыток. Попробуйте позже.',
			});
			break;

		default:
			setError('root' as Path<T>, {
				type: 'server',
				message: textMessage || `Ошибка ${statusCode}`,
			});
	}
}
