import { IEpisodeRatingResponse } from '@/entities/episode';
import { Episode } from '@/entities/episode/ui/Episode';
import { EditEpisodeInterest } from '@/features/editEpisodeInterest';
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
			<Episode
				number={number}
				title={title}
				rating={totalEpisodeRating}
				progress={progress}
			/>
			<EditEpisodeInterest
				episodeId={id}
				episodeRatingData={episodeRatingData}
			/>
		</div>
	);
}
