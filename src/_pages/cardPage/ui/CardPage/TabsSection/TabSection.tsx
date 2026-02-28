'use client';

import { UpTabs } from '@/shared/ui/Tabs';
import { CriteriaTab } from '../CriteriaTab/CriteriaTab';
import { EpisodeTab } from '../EpisodeTab/EpisodeTab';
import styles from './TabSection.module.scss';
export function TabSection({ cardId }: { cardId: string }) {
	return (
		<UpTabs className={styles.tabWrapper}>
			<UpTabs.Header>
				<UpTabs.Tab title='Эпизоды' />
				<UpTabs.Tab title='Редактирование критериев' />
				<UpTabs.Tab title='Оценка' />
			</UpTabs.Header>

			<UpTabs.Content viewIndex={0}>
				<EpisodeTab cardId={cardId} />
			</UpTabs.Content>
			<UpTabs.Content viewIndex={1}>
				<CriteriaTab cardId={cardId} />
			</UpTabs.Content>
			<UpTabs.Content viewIndex={2}>THIRD</UpTabs.Content>
		</UpTabs>
	);
}
