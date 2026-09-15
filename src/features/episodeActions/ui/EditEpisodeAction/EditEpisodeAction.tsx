import { type EpisodeFormStateType } from '@/entities/episode/model/types';
import { useModal } from '@/shared/hooks/useModal';
import { useCallback } from 'react';
import { EditEpisodeActionModal } from './EditEpisodeActionModal';

interface IEditEpisodeActionProps {
	episodeId: string;
	data: Pick<EpisodeFormStateType, 'number' | 'title'>;
	className?: string;
}

export function EditEpisodeAction({
	episodeId,
	data,
	className,
}: IEditEpisodeActionProps) {
	const { showModal } = useModal();
	const handleOnEditClick = useCallback(() => {
		showModal(<EditEpisodeActionModal episodeId={episodeId} data={data} />);
	}, [data, showModal]);

	return (
		<button className={className} onClick={handleOnEditClick}>
			Редактирование
		</button>
	);
}
