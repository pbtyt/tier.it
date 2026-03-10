import { SITE_ROUTES_BASE } from '@/shared/config/page-url.config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { CardFormStateType } from '../model/types';
import { cardService } from '../service/card.service';

type CardWithPosterFormStateType = CardFormStateType & { posterFile: File } & {
	bannerFile: File | null;
};

export function useCreateCard() {
	const queryClient = useQueryClient();
	const { push } = useRouter();

	const { mutate: createCard } = useMutation({
		mutationKey: ['create card'],
		mutationFn: (data: CardFormStateType) => cardService.createCard(data),
		onSuccess({ data: createdCard }) {
			queryClient.invalidateQueries({
				queryKey: ['cards'],
			});

			push(`${SITE_ROUTES_BASE.CARD}/${createdCard.id}`);
		},
	});

	const { mutate: createCardWithPoster } = useMutation({
		mutationKey: ['create card with poster'],
		mutationFn: async (data: CardWithPosterFormStateType) => {
			const { data: createdCard } = await cardService.createCard({
				title: data.title,
				episodesNumber: 0,
				status: data.status,
				type: data.type,
				criteria: data.criteria,
			});

			const formData = new FormData();
			formData.append('filePoster', data.posterFile);

			await cardService.uploadPoster(createdCard.id, true, formData);

			//TODO: [WEIRDO] maybe need to find better solution
			if (data.bannerFile) {
				const formData = new FormData();
				formData.append('fileBanner', data.bannerFile);
				await cardService.uploadPoster(createdCard.id, false, formData);
			}

			return createdCard;
		},
		onSuccess(createdCard) {
			// queryClient.invalidateQueries({
			// 	queryKey: ['cards'],
			// });

			push(`${SITE_ROUTES_BASE.CARD}/${createdCard.id}`);
		},
	});

	return { createCard, createCardWithPoster };
}
