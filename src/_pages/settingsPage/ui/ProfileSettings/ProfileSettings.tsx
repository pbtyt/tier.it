'use client';

import { useUpdateUser, useUserProfile } from '@/entities/user';
import { UserFormType } from '@/entities/user/model/types';
import { UploadPoster } from '@/features/uploadPoster';
import { Button } from '@/shared/ui/Button';
import { Field } from '@/shared/ui/Field';
import { Image } from '@/shared/ui/Image';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './ProfileSettings.module.scss';

export function ProfileSettings() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { isValid },
	} = useForm<Pick<UserFormType, 'name'>>({
		mode: 'onChange',
	});

	const { updateUser } = useUpdateUser({
		onSuccess() {
			reset();
		},
	});

	const userData = useUserProfile({
		fields: 'name,avatarUrl',
	});

	const onSubmit: SubmitHandler<Pick<UserFormType, 'name'>> = data => {
		updateUser(data);
	};

	const [poster, setPoster] = useState<File | null>(null);

	const handleSetPoster = (
		fileOrUpdater: File | null | ((prev: File | null) => File | null),
	) => {
		setPoster(fileOrUpdater);
	};

	return (
		<section className={styles.profile}>
			<h3>Настройки профиля</h3>
			<div className={styles.info}>
				В этом разделе настроек вы можете изменить данные вашего профиля
			</div>
			<div className={styles.info}>
				В основном, эти настройки влияют на то, как ваш профиль будет
				отображаться у других пользователей
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
				<h4>Никнейм</h4>
				<div className={styles.info}>Изменить ваш никнейм</div>
				<div className={styles.info}>
					Этот никнейм будет отображаться в вашем профиле и будет виден другим
					пользователям
				</div>

				<div className={styles.formInputWrapper}>
					<Field
						className={styles.field}
						id='nickname'
						placeholder={userData?.name || 'Ваш никнейм....'}
						label=''
						{...register('name', { required: 'Nickname is required!' })}
					/>
					<Button
						disabled={!isValid}
						buttonText='Обновить'
						buttonColor='gray'
						size='md'
					/>
				</div>
			</form>

			<div className={styles.formWrapper}>
				<h4>Аватар</h4>
				<div className={styles.info}>Изменить ваш аватар</div>
				<div className={styles.info}>
					Этот аватар будет отображаться в вашем профиле и будет виден другим
					пользователям
				</div>

				<div className={styles.posterUploadWrapper}>
					<UploadPoster
						setFile={handleSetPoster}
						previewClassName={styles.poster}
					/>
					<Image
						src={`${process.env.NEXT_PUBLIC_API_UPLOADS_URL}${userData?.avatarUrl}`}
						className={styles.poster}
					/>
				</div>
				<Button
					style={{ marginTop: '1rem' }}
					buttonText='Обновить'
					buttonColor='gray'
					size='md'
				/>
			</div>
		</section>
	);
}
