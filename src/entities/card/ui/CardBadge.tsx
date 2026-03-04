import { getBadgeByInterest } from '@/shared/utils/getBadgeByInterest';
import { CSSProperties } from 'react';
import styles from './Card.module.scss';

interface ICardBadgeProps {
	rating: number;
}
export function CardBadge({ rating }: ICardBadgeProps) {
	const badgeConfig = getBadgeByInterest(rating);
	const badgeTier = badgeConfig.tier;
	const badgeBackgroundColorStyle = {
		'--badge-bg-c': badgeConfig.color,
	} as CSSProperties;
	return (
		<div className={styles.badge} style={badgeBackgroundColorStyle}>
			<div className={styles.tier}>{badgeTier}</div>
		</div>
	);
}
