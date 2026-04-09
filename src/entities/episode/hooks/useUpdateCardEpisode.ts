import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EpisodeUpdateType } from '../model/types';
import { episodesService } from '../service/episode.service';

export function useUpdateCardEpisode({
	key,
	onSuccess,
}: {
	key?: string;
	onSuccess?: () => void;
}) {
	const queryClient = useQueryClient();

	const { mutate: updateCardEpisode } = useMutation({
		mutationKey: ['update episode', key],
		mutationFn: ({ id, data }: { id: string; data: EpisodeUpdateType }) =>
			episodesService.updateEpisode(id, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['episodes'],
			});

			//Update Card Info (Total Rating, etc.)
			queryClient.invalidateQueries({
				queryKey: ['card'],
			});

			onSuccess?.();
		},
	});

	return { updateCardEpisode };
}
