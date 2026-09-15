import { SITE_ROUTES_BASE } from '@/shared/config/page-url.config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { type CardWithPosterFormStateType } from '../model/types';
import { cardService } from '../service/card.service';

export function useCreateCard() {
	const queryClient = useQueryClient();
	const { push } = useRouter();

	const { mutate: createCard } = useMutation({
		mutationKey: ['create card'],
		mutationFn: async (data: CardWithPosterFormStateType) => {
			const { bannerFile, posterFile, ...cardData } = data;
			const { data: createdCard } = await cardService.createCard(cardData);

			if (posterFile) {
				const posterFormData = new FormData();
				posterFormData.append('filePoster', posterFile);
				await cardService.uploadPoster(createdCard.id, true, posterFormData);
			}

			if (bannerFile) {
				const bannerFormData = new FormData();
				bannerFormData.append('fileBanner', bannerFile);
				await cardService.uploadPoster(createdCard.id, false, bannerFormData);
			}

			return createdCard;
		},
		onSuccess: ({ id: cardId }) => {
			queryClient.invalidateQueries({
				queryKey: ['cards'],
			});

			push(`${SITE_ROUTES_BASE.CARD}/${cardId}`);
		},
	});
	return { createCard };
}
