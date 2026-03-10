import { getAccessToken } from '@/entities/auth/services/token.service';
import { PickFields } from '@/shared/utils/utilTypes';
import { useQuery } from '@tanstack/react-query';
import { IUserResponse } from '../model/types';
import { userService } from '../services/user.service';

export const userKeys = {
	all: ['user'] as const,
	profile: () => [...userKeys.all, 'profile'] as const,
};

export function useUserProfile<F extends string = ''>({
	fields = '' as F,
}: {
	fields?: F;
}) {
	const { data: userData } = useQuery({
		queryKey: userKeys.profile(),
		queryFn: () => {
			console.log('PROFILE REQUEST');
			return userService.getProfile(fields);
		},
		enabled: !!getAccessToken(),
		staleTime: 5 * 60 * 1000,
	});

	return userData as PickFields<IUserResponse, F> | undefined;
}
