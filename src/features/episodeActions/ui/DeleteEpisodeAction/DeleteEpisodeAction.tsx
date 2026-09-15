'use client';

import { useDeleteCardEpisode } from '@/entities/episode/hooks/useDeleteCardEpisode';
import { useModal } from '@/shared/hooks/useModal';
import { ConfirmPopup } from '@/shared/ui/Modal';

export function DeleteEpisodeAction({
	episodeId,
	className,
}: {
	episodeId: string;
	className?: string;
}) {
	const { deleteCardEpisode } = useDeleteCardEpisode();
	const { showModal } = useModal();

	const handleOnDelete = () => deleteCardEpisode(episodeId);
	const handleOnDeleteClick = () =>
		showModal(<ConfirmPopup onConfirm={handleOnDelete} />);

	return (
		<button className={className} onClick={handleOnDeleteClick}>
			Удалить
		</button>
	);
}
