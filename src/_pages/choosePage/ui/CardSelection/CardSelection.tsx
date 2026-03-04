'use client';

import { useCards } from '@/entities/card/hooks/useCards';
import { Scroll } from '@/shared/ui/Scroll';
import { CardWithActions } from '@/widgets/cardWithActions/ui/CardWithActions';
import { useMemo } from 'react';
import { CardAdd } from '../CardAdd/CardAdd';
import styles from './CardSelection.module.scss';

export function CardSelection() {
	const { items } = useCards({ fields: 'id,title,posterUrl,totalCardRating' });

	const renderCards = useMemo(() => {
		if (!items) return [];
		return items.map(card => <CardWithActions key={card.id} cardData={card} />);
	}, [items]);

	return (
		<section className={styles.cardsContainer}>
			<Scroll withArrows>
				{renderCards}
				<CardAdd className={styles.card} />
			</Scroll>
		</section>
	);
}
