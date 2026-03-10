import { Image } from '@/shared/ui/Image';
import clsx from 'clsx';
import { ICardResponse } from '../model/types';
import styles from './CardView.module.scss';

interface ICardProps {
	cardData: Pick<
		ICardResponse,
		'title' | 'posterUrl' | 'id' | 'totalCardRating'
	>;
	className?: string;
}

export function CardView({ cardData, className }: ICardProps) {
	const posterUrl = cardData.posterUrl
		? `${process.env.NEXT_PUBLIC_API_UPLOADS_URL}${cardData.posterUrl}`
		: process.env.NEXT_PUBLIC_PLACEHOLDER;
	return (
		<div className={styles.wrapper}>
			<div className={styles.primaryInfo}>
				<Image src={posterUrl} className={styles.poster} />

				<div className={styles.container}>
					<div className={styles.title}>{cardData.title}</div>
					<p className={clsx(styles.description, styles.hidden)}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. A non quia
						ad fugit doloremque consequatur, fuga culpa ut. Culpa perferendis
						corporis eius consequatur omnis, exercitationem voluptate animi
						facere eveniet a! Et aliquam, optio maiores eveniet pariatur alias
						rem eos minima earum delectus eius repellat ipsam! Quisquam dolore
						suscipit praesentium quam vitae itaque minus, incidunt quibusdam
						quod et repellendus sit odio. Totam vel illum quasi ratione quidem
						sint iste rem explicabo, consequuntur quam molestiae, officiis
						aliquam eius quibusdam provident. Magnam rem aliquid omnis incidunt
						ea voluptatibus maxime iste sit, eius labore!
					</p>
					<div className={styles.metaInfo}>2023 - ТВ - Завершен</div>
				</div>
			</div>
			<div className={styles.statistics}>
				<div className={styles.title}>Статистика по тэгам</div>
				<div className={styles.tagsStat}>
					<div className={styles.tagWrapper}>
						<div className={styles.tagTitle}>ABSOLUTE CINEMA</div>
						<div className={styles.tagValue}>3</div>
					</div>
					<div className={styles.tagWrapper}>
						<div className={styles.tagTitle}>PEAK</div>
						<div className={styles.tagValue}>5</div>
					</div>
				</div>
			</div>
			<div className={styles.episodesInfo}>
				<div className={styles.title}>Эпизоды</div>
				<div className={styles.container}>
					<div className={styles.episode}>
						<div className={styles.rating}>B+</div>
					</div>
					<div className={styles.episode}>
						<div className={styles.rating}>A</div>
					</div>
					<div className={styles.episode}>
						<div className={styles.rating}>A</div>
					</div>
					<div className={styles.episode}>
						<div className={styles.rating}>B+</div>
					</div>
					<div className={styles.episode}>
						<div className={styles.rating}>A+</div>
					</div>
					<div className={styles.episode}>
						<div className={styles.rating}>A</div>
					</div>
					<div className={styles.episode}>
						<div className={styles.rating}>B</div>
					</div>
					<div className={styles.episode}>
						<div className={styles.rating}>B</div>
					</div>
					<div className={styles.episode}>
						<div className={styles.rating}>S</div>
					</div>
					<div className={styles.episode}>
						<div className={styles.rating}>S</div>
					</div>
				</div>
			</div>
		</div>
	);
}
