'use client';

import { SITE_ROUTES_BASE } from '@/shared/config/page-url.config';
import { useModal } from '@/shared/hooks/useModal';
import { Image } from '@/shared/ui/Image';
import { ConfirmPopup } from '@/shared/ui/Modal';
import { getBadgeByInterest } from '@/shared/utils/getBadgeByInterest';
import clsx from 'clsx';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CSSProperties, useCallback } from 'react';
import { useDeleteCard } from '../hooks/useDeleteCard';
import { ICardResponse } from '../model/types';
import styles from './Card.module.scss';

interface ICardProps {
	cardData: Pick<
		ICardResponse,
		'title' | 'posterUrl' | 'id' | 'totalCardRating'
	>;
	className?: string;
}

export function Card({ cardData, className }: ICardProps) {
	//TODO: Decompose x3 !!!!!

	const { showModal } = useModal();

	const { push } = useRouter();

	const { deleteCard } = useDeleteCard();

	const handleOnDelete = useCallback(() => {
		deleteCard(cardData.id);
	}, []);

	const handleOnEdit = useCallback(() => {
		push(`${SITE_ROUTES_BASE.EDIT_CARD}/${cardData.id}`);
	}, []);

	const badgeConfig = getBadgeByInterest(cardData.totalCardRating);
	const badgeTier = badgeConfig.tier;
	const badgeBackgroundColorStyle = {
		'--badge-bg-c': badgeConfig.color,
	} as CSSProperties;

	const posterUrl = cardData.posterUrl
		? `${process.env.NEXT_PUBLIC_API_UPLOADS_URL}${cardData.posterUrl}`
		: '/placeholders/poster_placeholder.jpg';

	return (
		<div className={styles.cardWrapper}>
			<Link
				href={`${SITE_ROUTES_BASE.CARD}/${cardData.id}`}
				className={clsx(styles.card, className)}
			>
				<div className={styles.badge} style={badgeBackgroundColorStyle}>
					<div className={styles.tier}>{badgeTier}</div>
				</div>
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
			<button className={styles.editButton} onClick={handleOnEdit}>
				<Edit size={30} />
			</button>
			<button
				className={styles.trashButton}
				onClick={() => {
					showModal(<ConfirmPopup onConfirm={handleOnDelete} />);
				}}
			>
				<Trash2 size={30} />
			</button>
		</div>
	);
}
