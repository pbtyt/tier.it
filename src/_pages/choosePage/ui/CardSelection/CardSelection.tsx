'use client';

import { Card } from '@/entities/card';
import { useCards } from '@/entities/card/hooks/useCards';
import { Scroll } from '@/shared/ui/Scroll';
import { useMemo } from 'react';
import { CardAdd } from '../CardAdd/CardAdd';
import styles from './CardSelection.module.scss';

export function CardSelection() {
	const { items } = useCards({ fields: 'id,title,posterUrl,totalCardRating' });

	const renderCards = useMemo(() => {
		if (!items) return [];
		return items.map(card => <Card key={card.id} cardData={card} />);
	}, [items]);

	return (
		<section className={styles.cardsContainer}>
			<Scroll withArrows>
				{renderCards}
				<CardAdd className={styles.card} />
			</Scroll>
			{/* <Scroll scrollStep={420}>
				{items?.map(card => (
					<Card
						key={card.id}
						cardData={{
							id: card.id,
							title: card.title,
							posterUrl: card.posterUrl,
						}}
					/>
				))}
				<CardAdd className={styles.card} />
			</Scroll> */}
		</section>
	);
}
