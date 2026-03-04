import { Image } from '@/shared/ui/Image';
import clsx from 'clsx';
import styles from './FranchiseTab.module.scss';

// NOTE: WIP

//TODO: Change to backend response types
interface IFranchiseItemProps {
	number: number;
	title: string;
	altTitle: string;
	meta: string;
	isActive?: boolean;
}

function FranchiseItem({
	number,
	title,
	altTitle,
	meta,
	isActive = false,
}: IFranchiseItemProps) {
	return (
		<div className={clsx(styles.wrapper, isActive && styles.active)}>
			<Image
				src='http://localhost:4200/uploads/images/cmm9kae4i0000utukrsplwfks/63776a5f-9af6-499b-b7be-e607f89cac68.jpg'
				className={styles.poster}
			/>

			<div className={styles.info}>
				<span className={styles.title}>{title}</span>
				<span className={styles.altTitle}>{altTitle}</span>
				<span className={styles.meta}>{meta}</span>
			</div>

			<div className={styles.numberWrapper}>
				<div className={clsx(styles.number, isActive && styles.active)}>
					#{number}
				</div>
			</div>
		</div>
	);
}

export function FranchiseTab() {
	return (
		<section style={{ display: 'flex', flexDirection: 'column' }}>
			<FranchiseItem
				number={1}
				title={'Звездное дитя'}
				altTitle={'Oshi No Ko'}
				meta={'2023 • ТВ • 11 эпизодов'}
			/>
			<FranchiseItem
				number={2}
				title={'Звездное дитя 2'}
				altTitle={'[Oshi No Ko] 2nd Season'}
				meta='2024 • ТВ • 13 эпизодов'
			/>
			<FranchiseItem
				number={3}
				title={'Звездное дитя 3'}
				altTitle={'[Oshi No Ko] 3rd Season'}
				meta='2026 • ТВ'
				isActive
			/>
		</section>
	);
}
