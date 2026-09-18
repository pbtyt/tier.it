'use client';
import { useUserProfile } from '@/entities/user';
import { ProfilePopover } from '@/features/profilePopover';
import { usePopover } from '@/shared/ui/Popover';
import { ProfileAvatar } from '@/shared/ui/ProfileAvatar';

//TODO: Rewrite
export function Profile() {
	//TODO: Test only
	const userData = useUserProfile({
		fields: 'name,avatarUrl,email',
	});

	const {
		ref: parentRef,
		openPopover,
		PopoverMarkup,
	} = usePopover<HTMLDivElement>(
		<ProfilePopover name={userData?.name || userData?.email || ''} />,
		{ topOffset: 10, attachmentPos: 'right' },
	);

	return (
		userData && (
			<div ref={parentRef} onClick={openPopover}>
				<ProfileAvatar border avatarUrl={userData.avatarUrl} />
				{PopoverMarkup}
			</div>
		)
	);
}
