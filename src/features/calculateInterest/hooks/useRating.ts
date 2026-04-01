import { type CriteriaType } from '@/entities/criteria';
import { type EpisodeRatingType } from '@/entities/episode';
import { useMemo } from 'react';
import { calculateInterest } from '../helpers/calculateInterest';
/*
 * NOTE:
 * The rating is stored in the database, but we do not take it from the database, we count * it on the client. (we take from the database only to calculate the progress bar in Episode)
 * there may be a problem in synchronizing the rating values with the database
 * Most likely there will be no problem, because we count the value on the client and recalculate it every time the criterion rating changes.
 *
 */
export const useRating = (
	criteriaRatings: EpisodeRatingType[],
	criteria: CriteriaType[],
) => {
	const interest = useMemo(
		() => calculateInterest(criteriaRatings, criteria),
		[criteriaRatings],
	);

	return { interest };
};
