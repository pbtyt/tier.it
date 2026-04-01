import { SITE_ROUTES_BASE } from '@/shared/config/page-url.config';
import clsx from 'clsx';
import { ArrowRight, Bell, BookHeart, User } from 'lucide-react';
import Link from 'next/link';
import styles from './ProfilePopover.module.scss';

//TODO: Rewrite; Move To Features Layer (ProfileButton Layer)
export function ProfilePopover({ name }: { name: string }) {
	return (
		<ul className={styles.wrapper}>
			<li className={clsx(styles.item, styles.active)}>
				<Link
					href={SITE_ROUTES_BASE.CHOOSE}
					style={{
						display: 'flex',
						gap: '.5rem',
						alignItems: 'center',
					}}
				>
					<User color='#bfbfbf' width={16} height={16} strokeWidth={3} />

					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'start',
						}}
					>
						<span style={{ fontWeight: '600' }}>{name}</span>
						<span
							style={{
								fontSize: '12px',
								fontWeight: '400',
								color: '#ebebf580',
								display: 'flex',
								alignItems: 'center',
								gap: '.2rem',
							}}
						>
							Мой профиль
							<ArrowRight
								color='#ebebf580'
								width={16}
								height={14}
								strokeWidth={2}
							/>
						</span>
					</div>
				</Link>
			</li>
			<div
				style={{
					backgroundColor: '#545458a6',
					height: '1px',
					width: '100%',
					marginBottom: '.2rem',
				}}
			></div>
			<li className={clsx(styles.item)}>
				<Bell color='#bfbfbf' width={14} height={14} strokeWidth={3} />
				{'Уведомления'}
			</li>
			<li className={clsx(styles.item)}>
				<BookHeart color='#bfbfbf' width={14} height={14} strokeWidth={3} />
				{'Избранное'}
			</li>
		</ul>
	);
}
