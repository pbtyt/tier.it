'use client';

import { useFranchise } from '@/entities/franchise';
import { Image } from '@/shared/ui/Image';
import clsx from 'clsx';
import styles from './FranchiseTab.module.scss';

interface IFranchiseItemProps {
	posterUrl?: string;
	order: number;
	title: string;
	altTitle: string;
	meta: string;
	isActive?: boolean;
}

function FranchiseItem({
	posterUrl,
	order,
	title,
	altTitle,
	meta,
	isActive = false,
}: IFranchiseItemProps) {
	const posterSrc = posterUrl
		? `${process.env.NEXT_PUBLIC_API_UPLOADS_URL}${posterUrl}`
		: process.env.NEXT_PUBLIC_PLACEHOLDER;
	return (
		<div className={clsx(styles.wrapper, isActive && styles.active)}>
			<Image src={posterSrc} className={styles.poster} />

			<div className={styles.info}>
				<span className={styles.title}>{title}</span>
				<span className={styles.altTitle}>{altTitle}</span>
				<span className={styles.meta}>{meta}</span>
			</div>

			<div className={styles.numberWrapper}>
				<div className={clsx(styles.number, isActive && styles.active)}>
					#{order}
				</div>
			</div>
		</div>
	);
}

export function FranchiseTab({ cardId }: { cardId: string }) {
	const { franchise } = useFranchise({ cardId });

	return (
		<section style={{ display: 'flex', flexDirection: 'column' }}>
			{franchise ? (
				franchise.franchiseReleases.map(franchiseRelease => (
					<FranchiseItem
						key={franchiseRelease.id}
						posterUrl={franchiseRelease.release.posterUrl}
						order={franchiseRelease.order}
						title={franchiseRelease.release.title}
						isActive={franchiseRelease.release.id === cardId}
						altTitle={franchiseRelease.release.title}
						meta={`2023 • ${franchiseRelease.release.type} • ${franchiseRelease.release.episodesNumber} эпизодов`}
					/>
				))
			) : (
				<>Нет связанных тайтлов</>

				// <ToggleButton
				// 	height={35}
				// 	width={75}
				// 	IconOn={PanelLeft}
				// 	IconOff={Grid2X2}
				// />
			)}
		</section>
	);
}
