import { handleAuthError, IAuthForm, useAuth } from '@/entities/auth';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export function useAuthForm() {
	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { isValid, errors },
	} = useForm<IAuthForm>({
		mode: 'onChange',
	});
	const [isLoginForm, setIsLoginForm] = useState<boolean>(true);

	const { login } = useAuth();

	const onSubmit: SubmitHandler<IAuthForm> = async data => {
		try {
			await login({ data, isLoginForm });
		} catch (error) {
			handleAuthError<IAuthForm>(error, { setError });
		}
	};

	return {
		register,
		handleSubmit,
		onSubmit,
		isValid,
		setIsLoginForm,
		isLoginForm,
		errors,
	};
}
