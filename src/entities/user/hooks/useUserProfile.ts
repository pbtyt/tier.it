import { getAccessToken } from '@/entities/auth/services/token.service';
import { PickFields } from '@/shared/utils/utilTypes';
import { useQuery } from '@tanstack/react-query';
import { userKeys } from '../constants/queryKeys';
import { IUserResponse } from '../model/types';
import { userService } from '../services/user.service';

export function useUserProfile<F extends string = ''>({
	fields = '' as F,
}: {
	fields?: F;
}) {
	const { data: userData } = useQuery({
		queryKey: userKeys.profile(),
		queryFn: () => userService.getProfile(fields),
		enabled: !!getAccessToken(),
		staleTime: 5 * 60 * 1000,
	});

	return userData as PickFields<IUserResponse, F> | undefined;
}

export function useUserStatistics() {
	const { data: userStatistics } = useQuery({
		queryKey: ['statistic'],
		queryFn: () => userService.getUserStatistics(),
		enabled: !!getAccessToken(),
	});

	return userStatistics;
}
