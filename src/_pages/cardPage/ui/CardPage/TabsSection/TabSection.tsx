'use client';

import { Tabs } from '@/shared/ui/Tabs';
import { CriteriaTab } from '../CriteriaTab/CriteriaTab';
import { EpisodeTab } from '../EpisodeTab/EpisodeTab';
import styles from './TabSection.module.scss';
export function TabSection({ cardId }: { cardId: string }) {
	return (
		<Tabs orientation='horizontal' className={styles.tabWrapper}>
			<Tabs.Header orientation='horizontal'>
				<Tabs.Tab title='Эпизоды' />
				<Tabs.Tab title='Редактирование критериев' />
				<Tabs.Tab title='Оценка' />
			</Tabs.Header>

			<Tabs.Content viewIndex={0}>
				<EpisodeTab cardId={cardId} />
			</Tabs.Content>
			<Tabs.Content viewIndex={1}>
				<CriteriaTab cardId={cardId} />
			</Tabs.Content>
			<Tabs.Content viewIndex={2}>THIRD</Tabs.Content>
		</Tabs>
	);
}
