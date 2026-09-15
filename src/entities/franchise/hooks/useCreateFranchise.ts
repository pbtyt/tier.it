import { SITE_ROUTES_BASE } from '@/shared/config/page-url.config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { type FranchiseWithPosterFormStateType } from '../model/types';
import { franchiseService } from '../service/franchise.service';

export function useCreateFranchise() {
	const queryClient = useQueryClient();
	const { push } = useRouter();

	const { mutate: createFranchise } = useMutation({
		mutationKey: ['create franchise'],
		mutationFn: async (data: FranchiseWithPosterFormStateType) => {
			const { posterFile, ...franchiseData } = data;

			const { data: createdFranchise } =
				await franchiseService.createFranchise(franchiseData);

			if (posterFile) {
				const formData = new FormData();
				formData.append('filePoster', posterFile);

				await franchiseService.uploadPoster(createdFranchise.id, formData);
			}

			return createdFranchise;
		},
		onSuccess: ({ id: franchiseId }) => {
			push(`${SITE_ROUTES_BASE.FRANCHISE}/${franchiseId}`);
		},
	});

	return { createFranchise };
}
