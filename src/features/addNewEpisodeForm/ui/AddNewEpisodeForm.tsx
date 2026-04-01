'use client';

import { useCreateCardEpisode } from '@/entities/episode/hooks/useCreateCardEpisode';
import { EpisodeFormStateType } from '@/entities/episode/model/types';
import { Button } from '@/shared/ui/Button';
import { Field } from '@/shared/ui/Field/ui/Field';
import { Plus } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './AddNewEpisodeForm.module.scss';

export function AddNewEpisodeForm({ cardId }: { cardId: string }) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { isValid },
	} = useForm<Pick<EpisodeFormStateType, 'title'>>({ mode: 'onChange' });

	const onSubmit: SubmitHandler<Pick<EpisodeFormStateType, 'title'>> = data => {
		createCardEpisode({ cardId: cardId, data: data });
	};

	const { createCardEpisode } = useCreateCardEpisode({
		cardId: cardId,
		onSuccess() {
			reset();
		},
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.addEpisodeForm}>
			<Field
				className={styles.episodeTitleField}
				id='episode-title'
				placeholder='Название эпизода: '
				label=''
				{...register('title')}
			/>
			<Button buttonColor='transparent' disabled={!isValid}>
				<Plus />
			</Button>
		</form>
	);
}
