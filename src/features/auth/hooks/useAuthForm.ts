import { IAuthForm, useAuth } from '@/entities/auth';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export function useAuthForm() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { isValid },
	} = useForm<IAuthForm>({
		mode: 'onChange',
	});
	const [isLoginForm, setIsLoginForm] = useState<boolean>(true);

	const { login } = useAuth();

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		login({ data, isLoginForm });
	};

	return {
		register,
		handleSubmit,
		onSubmit,
		isValid,
		setIsLoginForm,
		isLoginForm,
	};
}
