'use client';

import { type IEpisodeResponse } from '@/entities/episode';
import { usePopover } from '@/shared/ui/Popover';
import { PropsWithChildren } from 'react';
import { DeleteEpisodeAction } from '../DeleteEpisodeAction/DeleteEpisodeAction';
import { EditEpisodeAction } from '../EditEpisodeAction/EditEpisodeAction';
import styles from './EditEpisode.module.scss';

interface IEditEpisodePopoverProps {
	episodeData: Pick<IEpisodeResponse, 'id' | 'number' | 'title'>;
}

function EditEpisodePopover({ episodeData }: IEditEpisodePopoverProps) {
	return (
		<div className={styles.wrapper}>
			<EditEpisodeAction
				episodeId={episodeData.id}
				data={{ title: episodeData.title, number: episodeData.number }}
				className={styles.item}
			/>
			<DeleteEpisodeAction episodeId={episodeData.id} className={styles.item} />
		</div>
	);
}

interface IEditEpisodeProps {
	episodeData: Pick<IEpisodeResponse, 'id' | 'number' | 'title'>;

	className?: string;
}

export function EditEpisode({
	episodeData,
	className,
	children,
}: PropsWithChildren<IEditEpisodeProps>) {
	const {
		ref: parentRef,
		openPopover,
		PopoverMarkup,
	} = usePopover<HTMLButtonElement>(
		<EditEpisodePopover episodeData={episodeData} />,
		{
			topOffset: 5,
			attachmentPos: 'right',
		},
	);
	return (
		<button className={className} onClick={openPopover} ref={parentRef}>
			{children}
			{PopoverMarkup}
		</button>
	);
}
