import { PickFields } from '@/shared/utils/utilTypes';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { IEpisodeResponse } from '../model/types';
import { episodesService } from '../service/episode.service';

export function useCardEpisodes<F extends string = ''>({
	cardId,
	filter,
	fields = '' as F,
}: {
	cardId: string;
	filter?: string;
	fields?: F;
}) {
	const { data } = useQuery({
		queryKey: ['episodes', cardId, fields, filter],
		queryFn: () => episodesService.getEpisodes(cardId, fields, filter),
	});

	//TODO: CRITICAL PERFORMANCE PROBLEM
	// DELETE FROM ALL useQuery HOOKS LOCAL STATE WITH USEEFFECT HOOK
	const [episodes, setEpisodes] = useState<
		PickFields<IEpisodeResponse, F>[] | undefined
	>();

	useEffect(() => {
		setEpisodes(data?.data as PickFields<IEpisodeResponse, F>[] | undefined);
	}, [data?.data]);

	return { episodes };
}
