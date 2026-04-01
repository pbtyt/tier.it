'use client';

import { userKeys } from '@/entities/user/constants/queryKeys';
import { SITE_ROUTES_BASE } from '@/shared/config/page-url.config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { IAuthForm } from '../model/types';
import { authService } from '../services/auth.service';

export function useAuth() {
	const queryClient = useQueryClient();
	const { push } = useRouter();

	const { mutate: login } = useMutation({
		mutationKey: ['auth'],
		mutationFn: ({
			data,
			isLoginForm,
		}: {
			data: IAuthForm;
			isLoginForm: boolean;
		}) => authService.main(isLoginForm ? 'login' : 'register', data),

		onSuccess() {
			console.log('login');
			queryClient.invalidateQueries({ queryKey: userKeys.all });
			push(SITE_ROUTES_BASE.CHOOSE);
		},
	});

	const { mutate: logout } = useMutation({
		mutationKey: ['auth'],
		mutationFn: () => authService.logout(),
		onSuccess() {
			queryClient.removeQueries({ queryKey: userKeys.all });
		},
	});

	return { login, logout };
}
