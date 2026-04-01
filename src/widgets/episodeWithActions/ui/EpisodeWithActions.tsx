import { IEpisodeRatingResponse } from '@/entities/episode';
import { EditEpisodeInterest } from '@/features/editEpisodeInterest';
import { EllipsisVertical } from 'lucide-react';
import styles from './EpisodeWithActions.module.scss';

interface IEpisodeWithActionsProps {
	title: string;
	number: number;
	id: string;
	totalEpisodeRating: number;
	episodeRatingData?: IEpisodeRatingResponse[];
	progress: number;
}

export function EpisodeWithActions({
	id,
	number,
	title,
	totalEpisodeRating,
	episodeRatingData,
	progress,
}: IEpisodeWithActionsProps) {
	return (
		<div className={styles.wrapper}>
			<EditEpisodeInterest
				episodeId={id}
				episodeRatingData={episodeRatingData}
				title={title}
				number={number}
				rating={totalEpisodeRating}
				progress={progress}
			/>
			<button className={styles.moreActions}>
				<EllipsisVertical />
			</button>
		</div>
	);
}
