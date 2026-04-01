'use client';

import { Tabs } from '@/shared/ui/Tabs';
import { AccountSettings } from './AccountSettings/AccountSettings';
import { ProfileSettings } from './ProfileSettings/ProfileSettings';
import styles from './SettingsPage.module.scss';

export function SettingsPage() {
	return (
		<main className={styles.wrapper}>
			<Tabs orientation='vertical' className={styles.tabsMenuWrapper}>
				<Tabs.Header orientation='vertical' className={styles.tabs}>
					<Tabs.Tab title='Профиль' />
					<Tabs.Tab title='Аккаунт' />
				</Tabs.Header>
				<Tabs.Content viewIndex={0} className={styles.content}>
					<ProfileSettings />
				</Tabs.Content>
				<Tabs.Content viewIndex={1} className={styles.content}>
					<AccountSettings />
				</Tabs.Content>
			</Tabs>
		</main>
	);
}
