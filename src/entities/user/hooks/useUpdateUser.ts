import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userKeys } from '../constants/queryKeys';
import { UserFormType } from '../model/types';
import { userService } from '../services/user.service';

export function useUpdateUser({
	key,
	onSuccess,
}: {
	key?: string;
	onSuccess?: () => void;
}) {
	const queryClient = useQueryClient();

	const { mutate: updateUser } = useMutation({
		mutationKey: ['update user', key],
		mutationFn: (data: UserFormType) => userService.update(data),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: userKeys.profile() });
			onSuccess?.();
		},
	});

	return { updateUser };
}
