import { useMutation, useQueryClient } from '@tanstack/react-query';
import { episodesService } from '../service/episode.service';

export function useDeleteCardEpisode() {
	const queryClient = useQueryClient();

	const { mutate: deleteCardEpisode } = useMutation({
		mutationKey: ['delete episode'],
		mutationFn: (episodeId: string) => episodesService.deleteEpisode(episodeId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['episodes'],
			});
			queryClient.invalidateQueries({
				queryKey: ['card'],
			});
		},
	});

	return { deleteCardEpisode };
}
