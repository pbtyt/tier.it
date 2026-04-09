'use client';

import { IEpisodeRatingResponse } from '@/entities/episode';
import { CriteriaList } from '@/features/calculateInterest';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { X } from 'lucide-react';
import { useEpisodeModal } from '../hooks/useEpisodeModal';
import styles from './EpisodeModal.module.scss';

//TODO: RENAME PROPS (AND FOR CHILD COMP.) !!!!!!!!!!!!!!!!!!! IMPORTANT
export function EpisodeModal({
	id,
	episodeRatingData,
}: {
	id: string;
	episodeRatingData?: IEpisodeRatingResponse[];
}) {
	const {
		criteria,
		handleOnModalClose,
		handleOnSaveClick,
		hideModal,
		criteriaRatings,
		setCriteriaRatings,
		interest,
	} = useEpisodeModal(episodeRatingData ?? [], id);

	return (
		<Modal className={styles.modalWrapper} modalWidth='400px'>
			<div className={styles.title}>
				<span>Оценка</span>
				<button className={styles.closeButton} onClick={handleOnModalClose}>
					<X size={12} />
				</button>
			</div>

			<CriteriaList
				interest={interest}
				criteria={criteria ?? []}
				episodeRating={criteriaRatings}
				setEpisodeRating={setCriteriaRatings}
			/>

			<div className={styles.controlsWrapper}>
				<Button
					buttonText='Отмена'
					buttonColor='gray'
					className={styles.button}
					onClick={() => hideModal()}
				/>
				<Button
					buttonText='Сохранить'
					buttonColor='primary'
					className={styles.button}
					onClick={handleOnSaveClick}
				/>
			</div>
		</Modal>
	);
}
