import { UploadPoster } from '@/features/uploadPoster';
import { Image } from '@/shared/ui/Image';
import styles from './CardPoster.module.scss';

export function CardPoster({
	cardId,
	posterUrl,
}: {
	cardId: string;
	posterUrl: string | null;
}) {
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
			entityData={{ entity: 'card', entityId: cardId }}
			description='Отсутствует постер! Нажмите чтобы загрузить!'
			className={styles.noPoster}
		/>
	);
}
