import { Image } from '@/shared/ui/Image';
import { Tag } from '@/shared/ui/Tag/Tag';
import clsx from 'clsx';
import { ICardResponse } from '../model/types';
import styles from './TopCard.module.scss';
interface ITopCardProps {
	cardData: Pick<
		ICardResponse,
		'title' | 'posterUrl' | 'id' | 'totalCardRating' | 'bannerUrl'
	>;
	className?: string;
	top: number;
	minimalView?: boolean;
}

export function TopCard({
	cardData,
	className,
	top,
	minimalView = false,
}: ITopCardProps) {
	const posterUrl = cardData.posterUrl
		? `${process.env.NEXT_PUBLIC_API_UPLOADS_URL}${cardData.posterUrl}`
		: process.env.NEXT_PUBLIC_PLACEHOLDER;
	const bannerUrl = cardData.bannerUrl
		? `${process.env.NEXT_PUBLIC_API_UPLOADS_URL}${cardData.bannerUrl}`
		: process.env.NEXT_PUBLIC_PLACEHOLDER;

	return (
		<div
			className={clsx(styles.wrapper, minimalView && styles.minimal)}
			style={{
				backgroundImage: `url(${bannerUrl})`,
			}}
		>
			<div className={styles.container}>
				<div className={styles.header}>#{top}</div>
				<div className={styles.primaryInfo}>
					<div className={styles.title}>{cardData.title}</div>
				</div>
				<div className={styles.border}></div>

				<div className={styles.addInfoWrapper}>
					<div className={styles.addInfo}>
						<Tag
							title='Кол-во эпизодов'
							color='#c0c0c0'
							className={styles.addInfoTitle}
						/>
						<div className={styles.addInfoValue}>4</div>
					</div>
					<div className={styles.addInfo}>
						<Tag
							title='ABSOLUTE CINEMA'
							color='#ffbf0f'
							isCinema
							className={styles.addInfoTitle}
						/>
						<div className={styles.addInfoValue}>4</div>
					</div>
					<div className={styles.addInfo}>
						<Tag title='PEAK' color='#ffbf0f' className={styles.addInfoTitle} />
						<div className={styles.addInfoValue}>4</div>
					</div>
				</div>
			</div>
			<div className={styles.posterContainer}>
				<Image src={posterUrl} className={styles.poster} />
			</div>
		</div>
	);
}
