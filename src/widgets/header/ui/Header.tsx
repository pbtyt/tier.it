'use client';
import { SITE_ROUTES_BASE } from '@/shared/config/page-url.config';
import { SITE_NAME } from '@/shared/constants/seo.constants';
import { House } from 'lucide-react';
import Link from 'next/link';
import styles from './Header.module.scss';
import { Profile } from './profile/Profile';

export function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				{/* TODO: Need Logo */}
				<h3>{SITE_NAME}</h3>
			</div>
			<nav className={styles.menu}>
				<ul className={styles.menuItems}>
					<li>
						<Link href={SITE_ROUTES_BASE.CHOOSE} className={styles.menuItem}>
							<div className={styles.iconWrapper}>
								<House className={styles.icon} />
							</div>
							<span>Главная</span>
						</Link>
					</li>
					<li>
						<Link href={SITE_ROUTES_BASE.CHOOSE} className={styles.menuItem}>
							<div className={styles.iconWrapper}>
								<House className={styles.icon} />
							</div>
							<span>Главная</span>
						</Link>
					</li>
					<li>
						<Link href={SITE_ROUTES_BASE.CHOOSE} className={styles.menuItem}>
							<div className={styles.iconWrapper}>
								<House className={styles.icon} />
							</div>
							<span>Главная</span>
						</Link>
					</li>
				</ul>
			</nav>
			{/* <Select name={'fruit'} placeholder='Select Fruit'>
				<Select.Item preview='Apple' value='apple' />
				<Select.Item preview='Banana' value='banana' />
			</Select> */}
			<Profile />
		</header>
	);
}
