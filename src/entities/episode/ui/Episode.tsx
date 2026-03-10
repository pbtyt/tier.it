import { Tag } from '@/shared/ui/Tag/Tag';
import { getEpisodeTagByRating } from '@/shared/utils/getEpisodeTagByRating';
import styles from './Episode.module.scss';

interface IEpisodeProps {
	number: number;
	title: string;
	rating: number;
	progress: number;
}

export function Episode({ number, title, rating, progress }: IEpisodeProps) {
	const tag = getEpisodeTagByRating(rating);

	return (
		<div className={styles.wrapper}>
			<div className={styles.episode}>
				<span>Ep.</span>
				<span className={styles.number}>{number}</span>
			</div>
			<div className={styles.info}>
				<span className={styles.title}>{title || `Эпизод ${number}`}</span>
				<div className={styles.progressBarWrapper}>
					<input type='hidden' name='slider' />
					<div
						className={styles.progressBar}
						style={{ width: `${progress}%` }}
					></div>
				</div>
				{tag && <Tag color={tag.color} title={tag.title} />}
			</div>
		</div>
	);
}
