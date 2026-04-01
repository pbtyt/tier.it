import { SettingsPage } from '@/_pages/settingsPage';
import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Настройки',
	...NO_INDEX_PAGE,
};

export default async function SettingsPageRoute() {
	return <SettingsPage />;
}
