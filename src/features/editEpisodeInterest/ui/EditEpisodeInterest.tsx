'use client';

import { IEpisodeRatingResponse } from '@/entities/episode';
import { Episode } from '@/entities/episode/ui/Episode';
import { useModal } from '@/shared/hooks/useModal';
import { EpisodeModal } from '@/widgets/episodeModal';
import { useCallback } from 'react';
import styles from './EditEpisodeInterest.module.scss';

interface IEditEpisodeInterestProps {
	title: string;
	number: number;
	rating: number;
	progress: number;
	episodeId: string;
	episodeRatingData?: IEpisodeRatingResponse[];
}

export function EditEpisodeInterest({
	title,
	number,
	rating,
	progress,
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
			{/* <EllipsisVertical /> */}
			<Episode
				number={number}
				title={title}
				rating={rating}
				progress={progress}
			/>
		</button>
	);
}
