'use client';

import { Button } from '@/shared/ui/Button';
import { Field } from '@/shared/ui/Field/ui/Field';
import { useAuthForm } from '../hooks/useAuthForm';
import styles from './AuthForm.module.scss';

export function AuthForm() {
	const {
		handleSubmit,
		isLoginForm,
		isValid,
		onSubmit,
		register,
		setIsLoginForm,
	} = useAuthForm();

	return (
		<div className={styles.wrapper}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<Field
					id='email'
					label='Почта:'
					placeholder='Введите почту:'
					type='Email'
					{...register('email', { required: 'Email is required!' })}
				/>
				<Field
					id='password'
					label='Пароль: '
					placeholder='Введите пароль: '
					type='password'
					{...register('password', {
						required: 'Password is required!',
					})}
				/>
				<div className={styles.buttonsWrapper}>
					<Button
						className={styles.baseButton}
						disabled={!isValid}
						onClick={() => setIsLoginForm(true)}
						buttonText={isLoginForm ? 'Войти' : 'Зарегистрироваться'}
					/>
					<Button
						className={styles.regForm}
						onClick={e => {
							e.preventDefault();
							setIsLoginForm(prev => !prev);
						}}
						buttonColor='transparent'
						buttonText={
							isLoginForm
								? 'У вас нет учетной записи? Зарегистрируйтесь!'
								: 'Уже есть учетная запись? Войдите в него!'
						}
					/>
					{/* <Button
						onClick={() => setIsLoginForm(false)}
						buttonText='Зарегистрироваться'
					/> */}
				</div>
			</form>
		</div>
	);
}
