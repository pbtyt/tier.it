'use client';

import { useCallback, useState } from 'react';
import { Rating } from '../Rating/Rating';
import styles from './Criteria.module.scss';

interface ICriteriaProps {
	title: string;
	currentRating: number;
	onRatingChange: (newRating: number) => void;
}

export function Criteria({
	title,
	currentRating,
	onRatingChange,
}: ICriteriaProps) {
	const [rating, setRating] = useState<number>(0);

	const handleMinus = useCallback(() => {
		const newRating = Math.max(0, currentRating - 1);
		onRatingChange(newRating);
	}, [currentRating, onRatingChange]);

	const handlePlus = useCallback(() => {
		const newRating = Math.min(5, currentRating + 1);
		onRatingChange(newRating);
	}, [currentRating, onRatingChange]);

	return (
		<div className={styles.criteriaWrapper}>
			<div className={styles.criteriaInfo}>
				<span className={styles.criteriaName}>{title}</span>
				<span className={styles.criteriaRatingNumber}>
					{currentRating} из 5
				</span>
			</div>
			<div className={styles.border}></div>
			<Rating
				rating={currentRating}
				handleOnMinusClick={handleMinus}
				handleOnPlusClick={handlePlus}
			/>
		</div>
	);
}
