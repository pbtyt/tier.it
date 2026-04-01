'use client';
import { Image } from '@/shared/ui/Image';
import clsx from 'clsx';
import styles from './ProfileAvatar.module.scss';

interface IProfileAvatar {
	coverWidth?: number;
	border?: boolean;
	// userData: Pick<IUserResponse, 'name' | 'avatarUrl'>;
	avatarUrl?: string;
	className?: string;
}
//TODO: Move To Widget Layer
export function ProfileAvatar({
	border = false,
	avatarUrl,
	className,
}: IProfileAvatar) {
	const avatarFullUrl = avatarUrl
		? `${process.env.NEXT_PUBLIC_API_UPLOADS_URL}${avatarUrl}`
		: process.env.NEXT_PUBLIC_PLACEHOLDER;
	return (
		<div className={styles.wrapper}>
			<Image
				className={clsx(styles.coverWrapper, { [styles.border]: border })}
				src={avatarFullUrl}
			/>
		</div>
	);
}
