import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EpisodeFormStateType } from '../model/types';
import { episodesService } from '../service/episode.service';

export function useCreateCardEpisode({
	cardId,
	onSuccess,
}: {
	cardId: string;
	onSuccess?: () => void;
}) {
	const queryClient = useQueryClient();

	const { mutate: createCardEpisode } = useMutation({
		mutationKey: ['create episode'],
		mutationFn: ({
			cardId,
			data,
		}: {
			cardId: string;
			data: EpisodeFormStateType;
		}) => episodesService.createEpisode(cardId, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['episodes'],
			});
			queryClient.invalidateQueries({
				queryKey: ['card', cardId],
			});

			onSuccess?.();
		},
	});

	return { createCardEpisode };
}
