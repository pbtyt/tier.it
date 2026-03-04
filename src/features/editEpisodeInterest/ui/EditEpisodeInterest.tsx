'use client';

import { IEpisodeRatingResponse } from '@/entities/episode';
import { useModal } from '@/shared/hooks/useModal';
import { EpisodeModal } from '@/widgets/episodeModal';
import { EllipsisVertical } from 'lucide-react';
import { useCallback } from 'react';
import styles from './EditEpisodeInterest.module.scss';

interface IEditEpisodeInterestProps {
	episodeId: string;
	episodeRatingData?: IEpisodeRatingResponse[];
}

export function EditEpisodeInterest({
	episodeId,
	episodeRatingData,
}: IEditEpisodeInterestProps) {
	const { showModal } = useModal();
	const handleEpisodeClick = useCallback(() => {
		showModal(
			<EpisodeModal id={episodeId} episodeRatingData={episodeRatingData} />,
		);
	}, [episodeRatingData]);

	return (
		<button className={styles.moreButton} onClick={handleEpisodeClick}>
			<EllipsisVertical />
		</button>
	);
}
