import { type ICriteriaResponse } from '@/entities/criteria';
import { type EpisodeRatingType } from '@/entities/episode';

export const calculateInterest = (
	criteriaRating: EpisodeRatingType[],
	criteria: ICriteriaResponse[],
) => {
	const totalWeight = criteria.reduce((acc, c) => acc + c.weight, 0);

	return criteriaRating.reduce((acc, c) => {
		//TODO: Rename
		const criteriaConfig = criteria.find(cr => cr.id === c.criteriaId);
		return acc + ((criteriaConfig?.weight || 0) / totalWeight) * c.rating;
	}, 0);
};
