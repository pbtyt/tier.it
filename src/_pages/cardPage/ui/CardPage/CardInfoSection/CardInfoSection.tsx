'use client';

import { useCard } from '@/entities/card/hooks/useCard';
import { Button } from '@/shared/ui/Button';
import { UpTabs } from '@/shared/ui/Tabs';
import { Star } from 'lucide-react';
import { CardPoster } from '../CardPoster/CardPoster';
import { CriteriaTab } from '../CriteriaTab/CriteriaTab';
import { EpisodeTab } from '../EpisodeTab/EpisodeTab';
import { FranchiseTab } from '../FranchiseTab/FranchiseTab';
import { InfoTab } from '../InfoTab/InfoTab';
import styles from './CardInfoSection.module.scss';

export function CardInfoSection({ cardId }: { cardId: string }) {
	const { card } = useCard({
		id: cardId,
		fields: 'posterUrl,title,episodesNumber,type,status,episodes' as const,
	});

	return (
		<>
			<div className={styles.promo}>
				<CardPoster cardId={cardId} posterUrl={card?.posterUrl ?? null} />
				<div className={styles.info}>
					<h2 className={styles.title}>{card?.title}</h2>
					<div className={styles.rating}>
						<Star className={styles.icon} size={24} />
						{/* TODO: Add class to span */}
						<span>9.99</span>
					</div>
					<div className={styles.actions}>
						<div className={styles.left}>
							<Button buttonText='Смотреть' buttonColor='gray' />
							<Button buttonText='Смотрел' buttonColor='gray' />
							<Button buttonText='Посмотрел' buttonColor='gray' />
						</div>
						<div className={styles.right}>
							<Button buttonText='Добавить в коллекцию' buttonColor='gray' />
						</div>
					</div>
				</div>
			</div>

			<UpTabs className={styles.tabsWrapper}>
				<UpTabs.Header>
					<UpTabs.Tab title='О тайтле' />
					<UpTabs.Tab title='Эпизоды' />
					<UpTabs.Tab title='Критерии' />
					<UpTabs.Tab title='Связанное' />
				</UpTabs.Header>

				<UpTabs.Content viewIndex={0}>
					<InfoTab card={card} />
				</UpTabs.Content>
				<UpTabs.Content viewIndex={1}>
					<EpisodeTab cardId={cardId} />
				</UpTabs.Content>
				<UpTabs.Content viewIndex={2}>
					<CriteriaTab cardId={cardId} />
				</UpTabs.Content>
				<UpTabs.Content viewIndex={3}>
					<FranchiseTab />
				</UpTabs.Content>
			</UpTabs>
		</>
	);
}
