import { PickFields } from '@/shared/utils/utilTypes';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ICardResponse } from '../model/types';
import { cardService } from '../service/card.service';

export function useCard<F extends string = ''>({
	id,
	fields = '' as F,
}: {
	id: string;
	fields?: F;
}) {
	const { data } = useQuery({
		queryKey: ['card', id],
		queryFn: () => cardService.getCardById(id, fields),
	});

	const [card, setCard] = useState<PickFields<ICardResponse, F> | undefined>(
		data?.data as PickFields<ICardResponse, F> | undefined,
	);

	useEffect(() => {
		setCard(data?.data as PickFields<ICardResponse, F> | undefined);
	}, [data?.data]);

	return { card };
}
