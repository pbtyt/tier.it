import type {
	EpisodeRatingType,
	IEpisodeRatingResponse,
} from '@/entities/episode';
import { useUpdateCardEpisode } from '@/entities/episode/hooks/useUpdateCardEpisode';
import { useRating } from '@/features/calculateInterest/hooks/useRating';
import { useModal } from '@/shared/hooks/useModal';
import { useCallback, useState } from 'react';

export const useEpisodeModal = (
	episodeRatingData: IEpisodeRatingResponse[] | [],
	episodeId: string,
) => {
	const criteria = episodeRatingData?.map(e => e.criteria);

	const { hideModal } = useModal();
	const handleOnModalClose = useCallback(() => {
		hideModal();
	}, []);

	const [criteriaRatings, setCriteriaRatings] = useState<EpisodeRatingType[]>(
		episodeRatingData?.map(e => ({
			rating: e.rating,
			criteriaId: e.criteriaId,
		})) ?? [],
	);

	const { updateCardEpisode } = useUpdateCardEpisode({
		onSuccess() {
			hideModal();
		},
	});

	const { interest } = useRating(criteriaRatings, criteria);

	const handleOnSaveClick = useCallback(() => {
		updateCardEpisode({
			id: episodeId,
			data: {
				ratings: criteriaRatings,
				totalEpisodeRating: interest,
			},
		});
	}, [criteriaRatings]);

	return {
		criteria,
		handleOnModalClose,
		handleOnSaveClick,
		hideModal,
		criteriaRatings,
		setCriteriaRatings,
		interest,
	};
};
