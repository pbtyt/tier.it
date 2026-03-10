'use client';
import { useUserProfile } from '@/entities/user';
import { Button } from '@/shared/ui/Button';
import { ProfileImage } from '@/shared/ui/ProfileImage';

//TODO: Rewrite
export function Profile() {
	//TODO: Test only
	const userData = useUserProfile({
		fields: 'name,avatarUrl',
	});

	return !userData ? (
		<Button buttonText='Войти в аккаунт' buttonColor='primary' />
	) : (
		// <button ref={ref} onClick={openPopover}>
		// 	test
		// </button>

		<ProfileImage coverWidth={44} border userData={userData} />
	);
}
