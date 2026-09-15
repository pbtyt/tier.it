import { FranchiseCMSPage } from '@/_pages/franchiseCMSPage/FranchiseCMSPage';
import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Добавление франшизы',
	...NO_INDEX_PAGE,
};

export default function AddFranchisePage() {
	return <FranchiseCMSPage />;
}
