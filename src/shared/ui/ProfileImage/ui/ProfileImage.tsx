'use client';
import { ProfilePopover } from '@/features/profilePopover';
import { usePopover } from '@/shared/ui/Popover';
import clsx from 'clsx';
import styles from './ProfileImage.module.scss';

interface ProfileImageProps {
	coverWidth?: number;
	border?: boolean;
	className?: string;
}
//TODO: Move To Widget Layer
export function ProfileImage({
	coverWidth = 0,
	border = false,
	className,
}: ProfileImageProps) {
	const { ref: parentRef, openPopover } = usePopover<HTMLDivElement>(
		<ProfilePopover />,
	);

	return (
		<div
			ref={parentRef}
			onClick={openPopover}
			style={coverWidth ? { width: `${coverWidth}px` } : {}}
			className={clsx(styles.coverWrapper, { [styles.border]: border })}
		>
			<img
				src={process.env.NEXT_PUBLIC_PLACEHOLDER}
				alt='Profile Image'
				className={clsx(styles.cover, className)}
			/>
		</div>
	);
}
