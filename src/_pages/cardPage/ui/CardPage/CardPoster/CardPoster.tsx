import { UploadPoster } from '@/features/uploadPoster';
import { Image } from '@/shared/ui/Image';
import { useState } from 'react';
import styles from './CardPoster.module.scss';

export function CardPoster({
	cardId,
	posterUrl,
}: {
	cardId: string;
	posterUrl: string | null;
}) {
	//TODO: Remove
	const [poster, setPoster] = useState<File | null>(null);
	const handleSetPoster = (
		fileOrUpdater: File | null | ((prev: File | null) => File | null),
	) => {
		setPoster(fileOrUpdater);
	};
	//

	if (posterUrl) {
		return (
			<Image
				src={`${process.env.NEXT_PUBLIC_API_UPLOADS_URL}${posterUrl}`}
				className={styles.poster}
			/>
		);
	}
	return (
		<UploadPoster
			setFile={handleSetPoster}
			className={styles.noPoster}
			description='Отсутствует постер! Нажмите чтобы загрузить!'
		/>
		// <UploadPoster
		// 	entityData={{ entity: 'card', entityId: cardId }}
		// 	description='Отсутствует постер! Нажмите чтобы загрузить!'
		// 	className={styles.noPoster}
		// />
	);
}
