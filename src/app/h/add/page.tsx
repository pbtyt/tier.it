import { NewCardCreatorPage } from '@/_pages/addNewCard';
import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Добавление карточки',
	...NO_INDEX_PAGE,
};

export default function AddPage() {
	return <NewCardCreatorPage />;
}
