'use client';

import { useCards } from '@/entities/card/hooks/useCards';
import { TopCard } from '@/entities/card/ui/TopCard';
import styles from './CardSelection.module.scss';

export function CardSelection() {
	const { items } = useCards({
		fields: 'id,title,posterUrl,totalCardRating,bannerUrl',
	});

	// if (!items) return <></>;

	// const renderCards = useMemo(() => {
	// 	if (!items) return [];
	// 	return items.map(card => <CardWithActions key={card.id} cardData={card} />);
	// }, [items]);

	return (
		<section className={styles.cardsContainer}>
			{/* <Scroll withArrows>
				{renderCards}
				<CardAdd className={styles.card} />
			</Scroll> */}

			{/* {items.map(card => (
				<CardView cardData={card} key={card.id} />
			))} */}

			<div className={styles.wrapper}>
				<div className={styles.top1}>
					{items && <TopCard cardData={items.at(12)!} top={1} />}
				</div>

				<div className={styles.top23}>
					{items && <TopCard cardData={items.at(3)!} minimalView top={2} />}
					{items && <TopCard cardData={items.at(13)!} minimalView top={3} />}
				</div>
			</div>
		</section>
	);
}
