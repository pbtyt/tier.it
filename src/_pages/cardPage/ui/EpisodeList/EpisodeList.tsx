'use client';

import { useCardEpisodes } from '@/entities/episode/hooks/useCardEpisodes';
import { EpisodeWithActions } from '@/widgets/episodeWithActions';
import styles from './EpisodeList.module.scss';

interface IEpisodeListProps {
	cardId: string;
}

export function EpisodeList({ cardId }: IEpisodeListProps) {
	const { episodes } = useCardEpisodes({ cardId: cardId });
	console.log(episodes);
	return (
		<>
			{episodes?.map((e, index) => (
				<div className={styles.episodeWrapper} key={e.id}>
					<EpisodeWithActions
						title={e.title}
						number={e.number}
						totalEpisodeRating={e.totalEpisodeRating}
						progress={(e.totalEpisodeRating / 5) * 100}
						id={e.id}
						episodeRatingData={e.episodeRating}
					/>
				</div>
			))}
		</>
	);
}
