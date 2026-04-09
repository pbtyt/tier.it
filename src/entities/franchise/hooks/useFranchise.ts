import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { IFranchiseResponse } from '../model/types';
import { franchiseService } from '../service/franchise.service';

//Get Franchise Using CardId
export function useFranchise({ cardId }: { cardId: string }) {
	const { data } = useQuery({
		queryKey: ['franchise', cardId],
		queryFn: () => franchiseService.getByCardIdFranchise(cardId),
	});

	const [franchise, setFranchise] = useState<IFranchiseResponse | undefined>(
		data?.data,
	);

	useEffect(() => {
		setFranchise(data?.data);
	}, [data?.data]);

	return { franchise };
}
