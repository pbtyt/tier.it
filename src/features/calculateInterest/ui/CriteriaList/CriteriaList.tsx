'use client';

import { type CriteriaType } from '@/entities/criteria';
import { type EpisodeRatingType } from '@/entities/episode';
import { SetStateType } from '@/shared/utils/utilTypes';
import { Criteria } from '../Criteria/Criteria';
import styles from './CriteriaList.module.scss';

interface ICriteriaProps {
	criteria: CriteriaType[] | [];
	episodeRating: EpisodeRatingType[] | [];
	setEpisodeRating: SetStateType<EpisodeRatingType[]>;
	interest: number;
}
//TODO: Move CriteriaList From 'features' to 'widgets/episodeModal'
export function CriteriaList({
	criteria,
	episodeRating,
	setEpisodeRating,
	interest,
}: ICriteriaProps) {
	const handleRatingChange = (criteriaId: string, newRating: number) => {
		setEpisodeRating(prev =>
			prev.map(item =>
				item.criteriaId === criteriaId ? { ...item, rating: newRating } : item,
			),
		);
	};

	return (
		<>
			<div className={styles.wrapper}>
				{criteria.map(c => (
					<Criteria
						key={c.id}
						data={c}
						currentRating={
							episodeRating.find(cr => cr.criteriaId === c.id)?.rating || 0
						}
						onRatingChange={newRating => handleRatingChange(c.id, newRating)}
					/>
				))}
			</div>
			Интерес серии: {interest.toFixed(2)} из 5
		</>
	);
}
