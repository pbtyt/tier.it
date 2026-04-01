import { SITE_NAME } from '@/shared/constants/seo.constants';
import { Modals } from './(components)/modals';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './(components)/providers';
import './styles/global.scss';

const zen = Inter({
	subsets: ['cyrillic', 'latin', 'cyrillic-ext'],
	weight: ['300', '400', '500', '500', '700', '800'],
	display: 'swap',
	variable: '--font-zen',
	style: ['normal'],
});

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `${SITE_NAME} | %s`,
	},
	description: '',
	// icons: {
	// 	icon: '/favicon32.png',
	// },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body id='body' className={zen.className} style={{}}>
				<Providers>
					{children}
					<div id='modal-root'></div>
					<div id='popover-root'></div>
					<Modals />
				</Providers>
			</body>
		</html>
	);
}
