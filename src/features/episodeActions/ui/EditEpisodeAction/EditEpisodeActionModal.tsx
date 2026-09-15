'use client';

import { useUpdateCardEpisode } from '@/entities/episode/hooks/useUpdateCardEpisode';
import { type EpisodeFormStateType } from '@/entities/episode/model/types';
import { useModal } from '@/shared/hooks/useModal';
import { Button } from '@/shared/ui/Button';
import { Field } from '@/shared/ui/Field';
import { Modal } from '@/shared/ui/Modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './EditEpisodeActionModal.module.scss';

interface IEditEpisodeActionModalProps {
	episodeId: string;
	data: Pick<EpisodeFormStateType, 'number' | 'title'>;
}
export function EditEpisodeActionModal({
	episodeId,
	data,
}: IEditEpisodeActionModalProps) {
	const { hideModal } = useModal();
	const { updateCardEpisode } = useUpdateCardEpisode({ onSuccess: hideModal });

	const { register, handleSubmit } = useForm<
		Pick<EpisodeFormStateType, 'number' | 'title'>
	>({
		values: { title: data.title, number: data.number },
	});

	const onSubmit: SubmitHandler<
		Pick<EpisodeFormStateType, 'number' | 'title'>
	> = data => {
		updateCardEpisode({
			id: episodeId,
			data: { title: data.title, number: data.number },
		});
	};

	return (
		<Modal modalWidth='400px' className={styles.modalWrapper}>
			<Modal.Header title='Редактирование эпизода' />
			<form
				id='update-episode-form'
				onSubmit={handleSubmit(onSubmit)}
				className={styles.editEpisodeForm}
			>
				<Field
					id='episode-title'
					placeholder='Название эпизода'
					label='Название'
					{...register('title')}
				/>
				<Field
					id='episode-number'
					placeholder='Номер эпизода'
					label='Номер'
					{...register('number')}
				/>
			</form>
			<div className={styles.footer}>
				<Button
					buttonColor='primary'
					buttonText='Обновить'
					type='submit'
					form='update-episode-form'
				/>
			</div>
		</Modal>
	);
}
