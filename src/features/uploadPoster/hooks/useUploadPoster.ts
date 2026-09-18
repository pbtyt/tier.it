import { axiosWithAuth } from '@/shared/interceptors';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type IUpdatePosterParams } from '../model/types';

// export interface UploadPosterParams {
// 	entityId: string;
// 	entity: EntityType;
// }

type UploadResponse = {
	id: number;
	filename: string;
	path: string;
};

export const useUploadPoster = (
	updatePosterParams: IUpdatePosterParams | null,
) => {
	if (updatePosterParams === null) return null;

	const url =
		updatePosterParams.entityType === 'user'
			? `/user/profile/${updatePosterParams.entityId}/avatar`
			: `/card/${updatePosterParams.entityId}/poster`;

	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (file: File) => {
			const formData = new FormData();
			formData.append('filePoster', file);
			console.log(formData);

			const { data } = await axiosWithAuth.post<UploadResponse>(url, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			return data;
		},
		onSuccess() {
			console.log('success');
			queryClient.invalidateQueries({
				queryKey: [updatePosterParams.entityType, updatePosterParams.entityId],
			});
		},
	});
};
