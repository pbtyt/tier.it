'use client';
import { IUserResponse } from '@/entities/user/model/types';
import { ProfilePopover } from '@/features/profilePopover';
import { usePopover } from '@/shared/ui/Popover';
import clsx from 'clsx';
import styles from './ProfileImage.module.scss';

interface ProfileImageProps {
	coverWidth?: number;
	border?: boolean;
	userData: Pick<IUserResponse, 'name' | 'avatarUrl'>;
	className?: string;
}
//TODO: Move To Widget Layer
export function ProfileImage({
	coverWidth = 0,
	border = false,
	userData,
	className,
}: ProfileImageProps) {
	const { ref: parentRef, openPopover } = usePopover<HTMLDivElement>(
		<ProfilePopover name={userData.name} />,
	);

	return (
		<div
			ref={parentRef}
			onClick={openPopover}
			style={
				coverWidth
					? { width: `${coverWidth}px`, height: `${coverWidth}px` }
					: {}
			}
			className={clsx(styles.coverWrapper, { [styles.border]: border })}
		>
			<img
				src={`${process.env.NEXT_PUBLIC_API_UPLOADS_URL}${userData.avatarUrl}`}
				alt='Profile Image'
				className={clsx(styles.cover, className)}
			/>
		</div>
	);
}
