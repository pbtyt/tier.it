'use client';

import { SITE_ROUTES_BASE } from '@/shared/config/page-url.config';
import { Image } from '@/shared/ui/Image';
import clsx from 'clsx';
import Link from 'next/link';
import { ICardResponse } from '../model/types';
import styles from './Card.module.scss';
import { CardBadge } from './CardBadge';

interface ICardProps {
	cardData: Pick<
		ICardResponse,
		'title' | 'posterUrl' | 'id' | 'totalCardRating'
	>;
	className?: string;
}

export function Card({ cardData, className }: ICardProps) {
	const posterUrl = cardData.posterUrl
		? `${process.env.NEXT_PUBLIC_API_UPLOADS_URL}${cardData.posterUrl}`
		: process.env.NEXT_PUBLIC_PLACEHOLDER;

	return (
		<div className={styles.cardWrapper}>
			<Link
				href={`${SITE_ROUTES_BASE.CARD}/${cardData.id}`}
				className={clsx(styles.card, className)}
			>
				<CardBadge rating={cardData.totalCardRating} />
				<div
					style={{
						flexGrow: '1',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Image src={posterUrl} className={styles.cardPoster} />
				</div>

				<h3 className={styles.cardTitle}>{cardData.title}</h3>
			</Link>
		</div>
	);
}
