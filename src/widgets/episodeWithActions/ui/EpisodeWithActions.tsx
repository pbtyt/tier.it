import { IEpisodeRatingResponse } from '@/entities/episode';
import { EditEpisode, EditEpisodeInterest } from '@/features/episodeActions';
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
			<EditEpisode
				className={styles.moreActions}
				episodeData={{ id: id, title: title, number: number }}
			>
				<EllipsisVertical />
			</EditEpisode>
		</div>
	);
}
